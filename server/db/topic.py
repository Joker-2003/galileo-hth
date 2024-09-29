from datetime import datetime
from typing import Optional

from beanie import Document, Link
from pydantic import BaseModel

from .workspace import Workspace


class Topic(Document):
    workspace_id: Link[Workspace]
    title: str

    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "topics"
