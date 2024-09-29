from datetime import datetime

from beanie import Document, Link
from pydantic import BaseModel

from .workspace import Workspace


class TopicItem(BaseModel):
    content_type: str
    text: str


class Topic(Document):
    workspace_id: Link[Workspace]
    title: str
    body: list[TopicItem]
    done: bool = False

    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "topics"
