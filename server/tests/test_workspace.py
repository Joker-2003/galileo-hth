from pathlib import Path

import requests
import json
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.db import TopicItem
from server.tests.utils import create_user_if_not_exists, create_workspace, init_workspace, LOCALHOST

app = FastAPI()
client = TestClient(app)


def add_topic_to_workspace(workspace_id: str):
    response = requests.post(
        f"{LOCALHOST}/topic",
        json={
            "workspace_id": workspace_id,
            "title": "Test Title",
            "body": [{
                "content_type": "text",
                "text": "Test Item"
            }]
        }
    )
    return response.json()


def get_topics_of_workspace(workspace_id: str):
    response = requests.get(f"{LOCALHOST}/topic/workspace/{workspace_id}")
    return response.json()


def share_workspace(workspace_id: str, email: str):
    response = requests.post(
        f"{LOCALHOST}/workspace/share",
        json={
            "workspace_id": workspace_id,
            "email": email
        }
    )
    return response.json()


def test_workspace_create():
    asset_dir = Path(os.curdir).absolute().parents[1] / "assets"

    user_id = create_user_if_not_exists()
    workspace_id = create_workspace(user_id)

    _ = init_workspace(workspace_id, asset_dir / 'Syllabus.pdf')


def test_workspace_share():
    user_id1 = create_user_if_not_exists()
    workspace_id = create_workspace(user_id1)

    add_topic_to_workspace(workspace_id)
    topics = get_topics_of_workspace(workspace_id)
    assert len(topics) == 1

    user_id2 = create_user_if_not_exists("test2@gmail.com")
    new_workspace = share_workspace(workspace_id, "test2@gmail.com")
