from pathlib import Path

import requests
import json
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import create_user_if_not_exists, create_workspace

app = FastAPI()
client = TestClient(app)


def test_workspace_create():
    user_id = create_user_if_not_exists()
    _ = create_workspace(user_id)
