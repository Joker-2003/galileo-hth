import os
from pathlib import Path

import requests
from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import create_user_if_not_exists, LOCALHOST

app = FastAPI()
client = TestClient(app)


def upload_file(user_id: str, file_path: Path):
    url = f"{LOCALHOST}/document/{user_id}"
    files = [
        ('file', ('Syllabus.pdf', open(file_path, 'rb'), 'application/pdf'))
    ]
    response = requests.request("POST", url, files=files)
    assert response.status_code == 200


def get_user_by_id(user_id: str):
    response = requests.request("GET", f"{LOCALHOST}/user/id/{user_id}")
    return response.json()


def get_user_by_email(email: str):
    response = requests.request("GET", f"{LOCALHOST}/user/email/{email}")
    return response.json()


def update_user(user_id: str, name: str):
    payload = {
        "name": name,
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.request("PUT", f"{LOCALHOST}/user/{user_id}", headers=headers, json=payload)
    return response.json()


def delete_user(user_id: str):
    response = requests.request("DELETE", f"{LOCALHOST}/user/{user_id}")
    return response.json()


def test_user_results():
    user_id = create_user_if_not_exists()
    user = get_user_by_id(user_id)
    assert user['name'] == 'Thomas Lin'
    user = get_user_by_email('thomaslin910608@gmail.com')
    assert user['name'] == 'Thomas Lin'
    update_user(user_id, 'Tom')
    user = get_user_by_id(user_id)
    assert user['first_name'] == 'Tom'
    assert user['last_name'] == 'Lin'
    delete_user(user_id)
    user = get_user_by_id(user_id)
    assert user['detail'] == 'User not found by user_id'


def test_user_upload_file():
    asset_dir = Path(os.curdir).absolute().parents[1] / "assets"
    user_id = create_user_if_not_exists()
    upload_file(user_id, asset_dir / 'Syllabus.pdf')
