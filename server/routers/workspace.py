from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import Workspace, WorkspaceInsertForm, WorkspaceResponse

router = APIRouter(prefix="/workspace", tags=["workspace"])


@router.get("/{workspace_id}", response_model=WorkspaceResponse)
async def get_workspace(workspace_id: PydanticObjectId):
    workspace = await Workspace.get(workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return WorkspaceResponse.from_workspace(workspace)


@router.post("/", response_model=WorkspaceResponse)
async def create_workspace(workspace_form: WorkspaceInsertForm):
    workspace = Workspace.from_form(workspace_form)
    await workspace.insert()
    return WorkspaceResponse.from_workspace(workspace)
