import json
from pathlib import Path

import requests

LOCALHOST = "http://0.0.0.0:8000"


def create_user_if_not_exists(email: str = "test1@gmail.com"):
    response = requests.request("GET", f"{LOCALHOST}/user/email/{email}")
    if response.status_code == 404:
        payload = json.dumps({
            "email": email,
            "password": "password",
            "first_name": "Thomas",
            "last_name": "Lin"
        })
        headers = {'Content-Type': 'application/json'}

        response = requests.request("POST", f"{LOCALHOST}/user", headers=headers, data=payload)
        user_id = response.json()['user_id']
    else:
        user_id = response.json()['user_id']
    return user_id


def create_workspace(user_id: str):
    payload = json.dumps({
        "user_id": user_id,
        "title": "Test Workspace"
    })
    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", f"{LOCALHOST}/workspace", headers=headers, data=payload)
    workspace_id = response.json()['workspace_id']
    return workspace_id


def init_workspace(workspace_id: str, file_path: Path):
    url = f"{LOCALHOST}/workspace/{workspace_id}"
    files = [
        ('file', ('Syllabus.pdf', open(file_path, 'rb'), 'application/pdf'))
    ]
    response = requests.request("POST", url, files=files)
    return response.json()
