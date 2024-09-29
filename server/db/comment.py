from datetime import datetime

from beanie import Document, Indexed, Link
from pydantic import BaseModel

from .user import User

from .post import Post


class Comment(Document):
    user_id: Link[User]
    post_id: Link[Post]
    parent_id: Indexed(str, sparse=True)
    content: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "comments"


class CommentResponse(BaseModel):
    user_id: str
    post_id: str
    parent_id: str
    content: str
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_comment(cls, comment: Comment):
        return CommentResponse(
            user_id=str(comment.user_id),
            post_id=str(comment.post_id),
            parent_id=comment.parent_id,
            content=comment.content,
            created_at=comment.created_at,
            updated_at=comment.updated_at
        )


class CommentInsertForm(BaseModel):
    user_id: str
    post_id: str
    parent_id: str
    content: str


class CommentUpdateForm(BaseModel):
    user_id: str
    post_id: str
    content: str


class CommentLike(Document):
    user_id: Link[User]
    comment_id: Link[Comment]
    value: int
    created_at: datetime = datetime.now()

    class Settings:
        name = "comment_likes"


class CommentLikeResponse(BaseModel):
    user_id: str
    comment_id: str
    value: int
    created_at: datetime

    @classmethod
    def from_comment_like(cls, comment_like: CommentLike):
        return CommentLikeResponse(
            user_id=str(comment_like.user_id),
            comment_id=str(comment_like.comment_id),
            value=comment_like.value,
            created_at=comment_like.created_at
        )


class CommentLikeInsertForm(BaseModel):
    user_id: str
    comment_id: str
    value: int
