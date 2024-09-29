from datetime import datetime

from beanie import Document, Link
from pydantic import BaseModel

from .workspace import Workspace


class TopicItem(BaseModel):
    content_type: str
    text: str


class TopicInsertForm(BaseModel):
    workspace_id: str
    title: str
    body: list[TopicItem]


class Topic(Document):
    workspace_id: Link[Workspace]
    title: str
    body: list[TopicItem]
    done: bool = False

    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    @classmethod
    def from_form(cls, topic_form: TopicInsertForm):
        return cls(
            workspace_id=topic_form.workspace_id,
            title=topic_form.title,
            body=topic_form.body
        )

    class Settings:
        name = "topics"
