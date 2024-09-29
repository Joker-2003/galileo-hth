from pathlib import Path

import requests
import json
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import create_user_if_not_exists, create_workspace, init_workspace

app = FastAPI()
client = TestClient(app)


def test_workspace_create():
    asset_dir = Path(os.curdir).absolute().parents[1] / "assets"

    user_id = create_user_if_not_exists()
    workspace_id = create_workspace(user_id)

    result = init_workspace(workspace_id,  asset_dir / 'Syllabus.pdf')
    print(result)