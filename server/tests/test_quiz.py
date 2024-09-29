import json
import requests
from fastapi import FastAPI
from fastapi.testclient import TestClient

from server.tests.utils import LOCALHOST, create_user_if_not_exists, create_workspace

app = FastAPI()
client = TestClient(app)


def get_quiz_for_workspace(quiz_id: str, workspace_id: str):
    response = requests.request("GET", f"{LOCALHOST}/quiz/{quiz_id}?workspace_id={workspace_id}")
    return response.json()


def add_quiz_attempt(quiz_id: str, workspace_id: str, answer: str):
    payload = json.dumps({
        "quiz_id": quiz_id,
        "workspace_id": workspace_id,
        "answers": [
            {"question_id": "1", "answer": answer},
        ]
    })

    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", f"{LOCALHOST}/quiz/{quiz_id}/attempt", headers=headers, data=payload)
    return response.json()


def create_quiz(workspace_id: str):
    payload = {
        "workspace_id": workspace_id,
        "title": "Quiz 1",
        "introduction": "This is a quiz",
        "questions": [
            {
                "question_id": "1",
                "topic_id": "1",
                "question": "What is 1 + 1?",
                "answer": "A",
                "options": [
                    {"id": "A", "text": "2"},
                    {"id": "B", "text": "3"},
                    {"id": "C", "text": "4"},
                    {"id": "D", "text": "5"},
                ],
                "explanations": {
                    "A": {"correct_text": "Correct", "incorrect_text": "Incorrect"},
                    "B": {"correct_text": "Incorrect", "incorrect_text": "Correct"},
                    "C": {"correct_text": "Incorrect", "incorrect_text": "Correct"},
                    "D": {"correct_text": "Incorrect", "incorrect_text": "Correct"},
                }
            },
        ]
    }

    headers = {'Content-Type': 'application/json'}
    response = requests.request("POST", f"{LOCALHOST}/quiz/create", headers=headers, data=json.dumps(payload))
    return response.json()


def test_quiz():
    user_id = create_user_if_not_exists()
    workspace_id = create_workspace(user_id)

    quiz = create_quiz(workspace_id)
    print(quiz)
