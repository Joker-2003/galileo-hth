from pathlib import Path

import requests
import json
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import create_user_if_not_exists

app = FastAPI()
client = TestClient(app)


def test_user_upload_file():
    asset_dir = Path(os.curdir).absolute().parents[1] / "assets"

    user_id = create_user_if_not_exists()

    url = f"http://0.0.0.0:8000/uploads/{user_id}"

    files = [
        ('file', ('Syllabus.pdf', open(asset_dir / 'Syllabus.pdf', 'rb'), 'application/pdf'))
    ]

    response = requests.request("POST", url, files=files)
    assert response.status_code == 200
