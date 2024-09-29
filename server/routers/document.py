import uuid
from datetime import datetime

from beanie import PydanticObjectId
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from fastapi import APIRouter
from fastapi import UploadFile, File, HTTPException, Depends
from starlette.responses import StreamingResponse

from server.config import Settings, get_settings
from server.db import User, DocumentStore, DocumentStoreResponse
from server.utils.pdf import load_pdf_text

router = APIRouter(prefix="/document", tags=["document"])


@router.post("/upload/{user_id}", response_model=DocumentStoreResponse)
async def upload_file(
        user_id: PydanticObjectId,
        file: UploadFile = File(...),
        settings: Settings = Depends(get_settings)
):
    original_filename = file.filename
    file_extension = file.filename.split('.')[-1]

    user = await User.find_one(User.id == user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    key = f"{uuid.uuid4()}.{file_extension}"

    file_content = await file.read()

    extracted_text = None
    if file.content_type == "application/pdf":
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
    return DocumentStoreResponse.from_file_metadata(metadata)


@router.get("/{key}")
async def get_document_by_key(key: str, settings: Settings = Depends(get_settings)):
    document = await DocumentStore.find_one(DocumentStore.key == key)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    s3_client = settings.get_s3_client()
    try:
        s3_response = s3_client.get_object(Bucket=settings.s3_bucket_name, Key=key)
        return StreamingResponse(content=s3_response["Body"].iter_chunks())
    except NoCredentialsError:
        raise HTTPException(status_code=403, detail="AWS credentials not found.")
    except PartialCredentialsError:
        raise HTTPException(status_code=403, detail="Incomplete AWS credentials.")
    except s3_client.exceptions.NoSuchKey:
        raise HTTPException(status_code=404, detail="The document does not exist in S3.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
