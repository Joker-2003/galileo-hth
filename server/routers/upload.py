import aiofiles
from fastapi import APIRouter

from server.config import Settings, get_settings
from server.db import User, DocumentStore, DocumentStoreResponse
from server.db.document import DocumentAttribute
from server.utils.pdf import load_pdf_text

from fastapi import UploadFile, File, HTTPException, Depends
import uuid
from datetime import datetime
from beanie import PydanticObjectId

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/{user_id}", response_model=DocumentStoreResponse)
async def upload_file(
        user_id: PydanticObjectId,
        file: UploadFile = File(...),
        settings: Settings = Depends(get_settings)
):
    original_filename = file.filename
    file_extension = file.filename.split('.')[-1]

    if file.content_type not in {"application/pdf", "image/jpeg", "image/png"}:
        raise HTTPException(status_code=400, detail="Only PDF and Image files are allowed.")

    user = await User.find_one(User.id == user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    stored_filename = f"{uuid.uuid4()}.{file_extension}"
    if file.content_type == "application/pdf":
        destination = settings.pdf_directory / stored_filename
    else:
        destination = settings.image_directory / stored_filename

    async with aiofiles.open(destination, "wb") as buffer:
        content = await file.read()
        await buffer.write(content)

    extracted_text = None
    if file.content_type == "application/pdf":
        extracted_text = load_pdf_text(destination)

    attributes = DocumentAttribute(
        original_filename=original_filename,
        stored_filename=stored_filename,
        content_type=file.content_type,
        uploaded_at=datetime.utcnow()
    )
    metadata = DocumentStore(
        user_id=str(user.id),
        text=extracted_text,
        attributes=attributes
    )

    await DocumentStore.insert(metadata)
    return DocumentStoreResponse.from_file_metadata(metadata)
