from datetime import datetime

import pymongo
from beanie import Link, Document, Indexed
from pydantic import BaseModel

from .user import User


class DocumentStore(Document):
    user_id: Link[User]
    filename: str
    key: Indexed(str, unique=True)
    content_type: str
    text: Indexed(str, index_type=pymongo.TEXT)
    uploaded_at: datetime = datetime.now()

    class Settings:
        name = "docstore"


class DocumentStoreResponse(BaseModel):
    user_id: str
    attributes: dict

    @classmethod
    def from_file_metadata(cls, document_store: DocumentStore):
        return DocumentStoreResponse(
            user_id=str(document_store.user_id),
            attributes={
                'filename': document_store.filename,
                'key': document_store.key,
                'content_type': document_store.content_type,
                'uploaded_at': document_store.uploaded_at
            }
        )
