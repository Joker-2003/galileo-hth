from typing import List, Union

from beanie.odm.operators.find.comparison import In
from beanie.operators import Text
from bson import DBRef

from server.db import User, DocumentStore
from server.db.document import DocumentAttribute
from server.knowledge.base import Document


class MongoDBDocumentStore:
    """MongoDB document store which support full-text search query"""

    @staticmethod
    async def add(user: Union[User, DBRef], docs: Union[Document, List[Document]]):
        """Load documents into mongodb storage."""
        if isinstance(user, User):
            user = user.to_ref()

        data: list[DocumentStore] = [
            DocumentStore(
                user_id=user,
                text=doc.text,
                attributes=DocumentAttribute(**doc.metadata)
            )
            for doc in docs
        ]
        await DocumentStore.insert_many(data)

    @staticmethod
    async def query(user: Union[User, DBRef], query: str, top_k: int = 10) -> List[Document]:
        if isinstance(user, User):
            user = user.to_ref()

        docs = await DocumentStore.find(
            DocumentStore.user_id == user,
            Text(query),
            limit=top_k
        ).to_list()

        docs = [Document(id_=str(doc.id), text=doc.text, metadata=doc.attributes.dict()) for doc in docs]
        return docs

    @staticmethod
    async def get(user: Union[User, DBRef], ids: Union[List[str], str] = None) -> List[Document]:
        """Get document by id"""
        if isinstance(user, User):
            user = user.to_ref()

        args = [DocumentStore.user_id == user]
        if ids is not None:
            if not isinstance(ids, list):
                ids = [ids]
            args.append(In(Document.id, ids))
        docs = await DocumentStore.find(*args, ).to_list()

        docs = [Document(id_=str(doc.id), text=doc.text, metadata=doc.attributes.dict()) for doc in docs]
        return docs

    @staticmethod
    async def delete(user: Union[User, DBRef], ids: Union[List[str], str] = None):
        """Delete document by id"""
        if isinstance(user, User):
            user = user.to_ref()

        if not isinstance(ids, list):
            ids = [ids]

        args = [DocumentStore.user_id == user]
        if ids is not None:
            if not isinstance(ids, list):
                ids = [ids]
            args.append(In(Document.id, ids))
        await DocumentStore.find(*args).delete()

    @staticmethod
    async def count(user: Union[User, DBRef]) -> int:
        if isinstance(user, User):
            user = user.to_ref()
        return await DocumentStore.find(DocumentStore.user_id == user).count()
