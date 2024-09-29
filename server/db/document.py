from datetime import datetime

import pymongo
from beanie import Link, Document, Indexed
from pydantic import BaseModel

from .user import User


class DocumentAttribute(BaseModel):
    original_filename: str
    stored_filename: str
    content_type: str
    uploaded_at: datetime = datetime.now()


class DocumentStore(Document):
    user_id: Link[User]
    text: Indexed(str, index_type=pymongo.TEXT)
    attributes: DocumentAttribute

    class Settings:
        name = "docstore"


class DocumentStoreResponse(BaseModel):
    user_id: str
    attributes: dict

    @classmethod
    def from_file_metadata(cls, document_store: DocumentStore):
        return DocumentStoreResponse(
            user_id=str(document_store.user_id),
            original_filename=document_store.attributes.original_filename,
            stored_filename=document_store.attributes.stored_filename,
            content_type=document_store.attributes.content_type,
            uploaded_at=document_store.attributes.uploaded_at
        )
