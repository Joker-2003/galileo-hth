import json
import requests
from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import LOCALHOST

app = FastAPI()
client = TestClient(app)


def get_quiz_for_workspace(quiz_id: str, workspace_id: str):
    response = requests.request("GET", f"{LOCALHOST}/quiz/{quiz_id}?workspace_id={workspace_id}")
    return response.json()


def add_quiz_attempt(quiz_id: str, workspace_id: str):
    payload = json.dumps({
        "quiz_id": quiz_id,
        "workspace_id": workspace_id,
        "answers": [
            {"question_id": "1", "answer": "A"},
            {"question_id": "2", "answer": "B"},
            {"question_id": "3", "answer": "C"},
            {"question_id": "4", "answer": "D"},
            {"question_id": "5", "answer": "E"},
        ]
    })

    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", f"{LOCALHOST}/quiz/{quiz_id}/attempt", headers=headers, data=payload)
    return response.json()

