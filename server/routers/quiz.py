from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import Quiz, QuizResponse, QuizResultResponse, QuizAttempt, QuizAttemptInsertForm, QuestionResultItem, \
    Workspace

router = APIRouter(prefix="/quiz", tags=["quiz"])


@router.get("/{quiz_id}", response_model=List[QuizResponse])
async def get_quiz_for_workspace(quiz_id: PydanticObjectId, workspace_id: PydanticObjectId):
    quiz = await Quiz.get({
        "_id": quiz_id, "workspace_id": Workspace.get_ref(workspace_id)
    })

    if not quiz:
        raise HTTPException(status_code=404, detail=f"Quiz {quiz_id} not found")

    quiz_attempts = await QuizAttempt.find_many({"quiz_id": quiz_id, "workspace_id": workspace_id}).to_list()
    return QuizResponse.from_quiz(quiz, quiz_attempts)


@router.post("/{quiz_id}/attempt", response_model=QuizResultResponse)
async def add_quiz_attempt(quiz_attempt_form: QuizAttemptInsertForm):
    quiz = await Quiz.get(quiz_attempt_form.quiz_id)

    if not quiz:
        raise HTTPException(status_code=404, detail=f"Quiz {quiz_attempt_form.quiz_id} not found")

    attempt = QuizAttempt.from_form(quiz_attempt_form)
    await attempt.insert()

    question_attempts = attempt.get_question_attempts()

    questions = {}

    for question in quiz.questions:
        attempt = question_attempts[question.question_id]
        item = QuestionResultItem.from_question_attempt(question, attempt)
        questions[question.question_id] = item

    return QuizResultResponse(
        quiz_id=quiz_attempt_form.quiz_id,
        questions=questions
    )
