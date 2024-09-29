from datetime import datetime
from typing import Optional

from beanie import Document, Link, PydanticObjectId
from bson import DBRef
from pydantic import BaseModel

from .user import User


class WorkspaceInsertForm(BaseModel):
    user_id: str
    title: str
    created_at: datetime = datetime.now()


class Workspace(Document):
    user_id: Link[User]
    title: str
    mindmap_title: Optional[str] = None
    mindmap_content: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    @classmethod
    def get_ref(cls, workspace_id: str | PydanticObjectId):
        return DBRef(cls.Settings.name, workspace_id)

    @classmethod
    def from_form(cls, workspace_form: WorkspaceInsertForm):
        return cls(
            user_id=workspace_form.user_id,
            title=workspace_form.title,
            created_at=workspace_form.created_at,
            updated_at=workspace_form.created_at
        )

    class Settings:
        name = "workspace"


class WorkspaceResponse(BaseModel):
    workspace_id: str
    user_id: str
    title: str
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_workspace(cls, workspace: Workspace):
        return cls(
            workspace_id=str(workspace.id),
            user_id=str(workspace.user_id),
            title=workspace.title,
            created_at=workspace.created_at,
            updated_at=workspace.updated_at
        )
