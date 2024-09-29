from pathlib import Path

import requests
import json
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import create_user_if_not_exists, LOCALHOST, create_workspace

app = FastAPI()
client = TestClient(app)


def create_flashcard_group(workspace_id: str):
    payload = json.dumps({
        "workspace_id": workspace_id,
        "title": "Test Flashcard Group",
        "description": "Test Flashcard Group Description",
        "manual": True,
    })

    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", f"{LOCALHOST}/flashcard/group", headers=headers, data=payload)
    flashcard_group_id = response.json()['group_id']
    return flashcard_group_id


def create_flashcard(workspace_id: str, group_id: str):
    payload = json.dumps({
        "workspace_id": workspace_id,
        "group_id": group_id,
        "front": "Front of the flashcard",
        "back": "Back of the flashcard",
    })
    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", f"{LOCALHOST}/flashcard/card", headers=headers, data=payload)
    flashcard_id = response.json()['flashcard_id']
    return flashcard_id


def get_flashcard_group_by_id(group_id: str):
    response = requests.request("GET", f"{LOCALHOST}/flashcard/group/id/{group_id}")
    return response.json()


def get_flashcard_groups_by_workspace(workspace_id: str):
    response = requests.request("GET", f"{LOCALHOST}/flashcard/group/workspace/{workspace_id}")
    return response.json()


def get_flashcard_by_id(flashcard_id: str):
    response = requests.request("GET", f"{LOCALHOST}/flashcard/card/id/{flashcard_id}")
    return response.json()


def get_flashcards_by_workspace(workspace_id: str):
    response = requests.request("GET", f"{LOCALHOST}/flashcard/card/workspace/{workspace_id}")
    return response.json()


def delete_flashcard(flashcard_id: str):
    response = requests.request("DELETE", f"{LOCALHOST}/flashcard/card/{flashcard_id}")
    return response.json()


def test_flashcard():
    user_id = create_user_if_not_exists()
    workspace_id = create_workspace(user_id)

    group_id = create_flashcard_group(workspace_id)
    flashcard_id = create_flashcard(workspace_id, group_id)

    flashcard_group = get_flashcard_group_by_id(group_id)
    flashcard_groups = get_flashcard_groups_by_workspace(workspace_id)
    assert len(flashcard_groups) >= 1, "Flashcard group not found by workspace_id"

    flashcard = get_flashcard_by_id(flashcard_id)
    assert 'workspace_id' in flashcard, "Flashcard not found by id"

    flashcards = get_flashcards_by_workspace(workspace_id)
    assert len(flashcards) >= 1, "Flashcard not found by workspace_id"

    delete_flashcard(flashcard_id)
    flashcard = get_flashcard_by_id(flashcard_id)
    assert flashcard['detail'] == 'Flashcard not found', "Flashcard not deleted"
