from datetime import datetime
from typing import Optional

from beanie import Document, Link
from pydantic import BaseModel

from .user import User


class Post(Document):
    title: str
    content: str
    creator_id: Link[User]
    thumbnail_image: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "posts"


class PostResponse(BaseModel):
    title: str
    content: str
    creator_id: str
    thumbnail_image: str
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_post(cls, post: Post):
        return cls(
            title=post.title,
            content=post.content,
            creator_id=str(post.creator_id),
            thumbnail_image=post.thumbnail_image,
            created_at=post.created_at,
            updated_at=post.updated_at
        )


class PostInsertForm(BaseModel):
    title: str
    content: str
    creator_id: str
    thumbnail_image: Optional[str] = None


class PostUpdateForm(BaseModel):
    title: Optional[str]
    content: Optional[str]
    thumbnail_image: Optional[str]


class PostLike(Document):
    user_id: Link[User]
    post_id: Link[Post]
    value: int
    created_at: datetime = datetime.now()

    class Settings:
        name = "post_likes"


class PostLikeResponse(BaseModel):
    user_id: str
    post_id: str
    value: int
    created_at: datetime

    @classmethod
    def from_post_like(cls, post_like: PostLike):
        return cls(
            user_id=str(post_like.user_id),
            post_id=str(post_like.post_id),
            value=post_like.value,
            created_at=post_like.created_at
        )


class PostLikeInsertForm(BaseModel):
    user_id: str
    post_id: str
    value: int
