from datetime import datetime
from typing import Optional

from beanie import Document, Indexed, PydanticObjectId
from bson import DBRef
from pydantic import BaseModel


class User(Document):
    email: Indexed(str, unique=True)
    uid: Indexed(str, unique=True)
    image: str
    name: str
    registered_at: datetime = datetime.now()
    last_updated_at: datetime = datetime.now()
    last_login_at: Optional[datetime] = None  # When the user is created, last_login_at is None

    @classmethod
    def get_ref(cls, workspace_id: str | PydanticObjectId):
        return DBRef(cls.Settings.name, workspace_id)

    class Settings:
        name = "users"


class UserResponse(BaseModel):
    user_id: str
    email: str
    name: str
    last_updated_at: datetime

    @classmethod
    def from_user(cls, user: User):
        return cls(
            user_id=str(user.id),
            email=user.email,
            name=user.name,
            last_updated_at=user.last_updated_at
        )


class UserInsertForm(BaseModel):
    email: str
    uid: str
    image: str
    name: str


class UserUpdateForm(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None
    last_login_at: Optional[datetime] = None
