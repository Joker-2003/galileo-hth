import uuid
from datetime import datetime

from beanie import PydanticObjectId
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from fastapi import APIRouter
from fastapi import UploadFile, HTTPException, Depends
from starlette.requests import Request

from server.config import Settings, get_settings
from server.db import User, WorkspaceResponse, Workspace, WorkspaceInsertForm, Flashcard, Topic, DocumentStore
from server.db.topic import TopicItem
from server.utils import SyllabusParser, Syllabus, OutlineGenerator, MindmapGenerator, FlashcardGenerator
from server.utils.pdf import load_pdf_text

router = APIRouter(prefix="/workspace", tags=["workspace"])


@router.get("/{workspace_id}", response_model=WorkspaceResponse)
async def get_workspace(workspace_id: PydanticObjectId):
    workspace = await Workspace.get(workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return WorkspaceResponse.from_workspace(workspace)


@router.post("/", response_model=WorkspaceResponse)
async def create_workspace(workspace_form: WorkspaceInsertForm):
    workspace = Workspace.from_form(workspace_form)
    await workspace.insert()
    return WorkspaceResponse.from_workspace(workspace)


@router.post("/{workspace_id}")
async def init_workspace(
        workspace_id: PydanticObjectId,
        file: UploadFile,
        request: Request,
        settings: Settings = Depends(get_settings)
):
    workspace = await Workspace.get(workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    # Save PDF file to S3
    original_filename = file.filename
    file_extension = file.filename.split('.')[-1]

    user = await User.get(workspace.user_id.to_ref().id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported for syllabus uploads.")

    key = f"{uuid.uuid4()}.{file_extension}"
    file_content = await file.read()
    extracted_text = load_pdf_text(file_content)

    s3_client = settings.get_s3_client()
    try:
        s3_client.put_object(
            Bucket=settings.s3_bucket_name,
            Key=key,
            Body=file_content,
            ContentType=file.content_type
        )

    except NoCredentialsError:
        raise HTTPException(status_code=403, detail="AWS credentials not found.")
    except PartialCredentialsError:
        raise HTTPException(status_code=403, detail="Incomplete AWS credentials.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    metadata = DocumentStore(
        user_id=str(user.id),
        text=extracted_text,
        filename=original_filename,
        key=key,
        content_type=file.content_type,
        uploaded_at=datetime.now()
    )

    await DocumentStore.insert(metadata)

    syllabus_parser: SyllabusParser = request.app.state.syllabus_parser
    mindmap_generator: MindmapGenerator = request.app.state.mindmap_generator
    flashcard_generator: FlashcardGenerator = request.app.state.flashcard_generator

    syllabus: Syllabus = syllabus_parser.parse(extracted_text)

    topics = []
    for topic in syllabus.topics:
        topic_items = [
            TopicItem(
                content_type="title",
                text="Week " + str(topic.week) + ": " + topic.name
            ),
            TopicItem(
                content_type="subtitle",
                text="Summary"
            ),
            TopicItem(
                content_type="text",
                text=topic.summary
            ),
            TopicItem(
                content_type="subtitle",
                text="Key Terms"
            ),
            TopicItem(
                content_type="text",
                text=" ".join(topic.terms)
            ),
            TopicItem(
                content_type="subtitle",
                text="Common Questions"
            ),
            TopicItem(
                content_type="text",
                text=" ".join(topic.questions)
            )
        ]

        topic = Topic(
            workspace_id=workspace_id,
            title=topic.name,
            body=topic_items
        )
        topics.append(topic)
    await Topic.insert_many(topics)

    content = syllabus.model_dump_json()
    flashcards = flashcard_generator.generate(content)
    await Flashcard.insert_many([
        Flashcard(
            workspace_id=workspace_id,
            front=flashcard.front,
            back=flashcard.back,
        ) for flashcard in flashcards
    ])

    mindmap = mindmap_generator.generate(content)
    await workspace.set({
        Workspace.mindmap_title: mindmap.title,
        Workspace.mindmap_content: mindmap.content
    })
