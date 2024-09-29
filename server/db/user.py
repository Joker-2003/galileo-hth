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
    first_name: str
    last_name: str
    occupation: Optional[str] = None
    education: Optional[Education] = None
    registered_at: datetime = datetime.now()
    last_updated_at: datetime = datetime.now()
    last_login_at: Optional[datetime] = None  # When the user is created, last_login_at is None

    class Settings:
        name = "users"


class UserResponse(BaseModel):
    user_id: str
    email: str
    first_name: str
    last_name: str
    occupation: Optional[str] = None
    education: Optional[Education] = None
    last_updated_at: datetime

    @classmethod
    def from_user(cls, user: User):
        return cls(
            user_id=str(user.id),
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            occupation=user.occupation,
            education=user.education,
            last_updated_at=user.last_updated_at
        )


class UserInsertForm(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    occupation: Optional[str] = None
    education: Optional[Education] = None


class UserUpdateForm(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    occupation: Optional[str] = None
    education: Optional[Education] = None
    last_login_at: Optional[datetime] = None
