from datetime import datetime
from typing import Optional

from beanie import Document, Indexed
from pydantic import BaseModel


class Education(BaseModel):
    level: str
    school: str
    major: list[str]


class User(Document):
    email: Indexed(str, unique=True)
    password: str
    name: str
    occupation: Optional[str] = None
    registered_at: datetime = datetime.now()
    last_updated_at: datetime = datetime.now()
    last_login_at: Optional[datetime] = None  # When the user is created, last_login_at is None

    class Settings:
        name = "users"


class UserResponse(BaseModel):
    user_id: str
    email: str
    name: str
    occupation: Optional[str] = None
    education: Optional[Education] = None
    last_updated_at: datetime

    @classmethod
    def from_user(cls, user: User):
        return cls(
            user_id=str(user.id),
            email=user.email,
            name=user.name,
            occupation=user.occupation,
            education=user.education,
            last_updated_at=user.last_updated_at
        )


class UserInsertForm(BaseModel):
    email: str
    password: str
    name: str
    occupation: Optional[str] = None
    education: Optional[Education] = None


class UserUpdateForm(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    name: Optional[str] = None
    occupation: Optional[str] = None
    education: Optional[Education] = None
    last_login_at: Optional[datetime] = None
