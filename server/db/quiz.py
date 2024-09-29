from collections import defaultdict
from datetime import datetime

from beanie import Document, Link, PydanticObjectId
from bson import DBRef
from pydantic import BaseModel

from .topic import Topic
from .workspace import Workspace


class QuestionOption(BaseModel):
    id: str
    text: str


class QuestionOptionExplanation(BaseModel):
    correct_text: str  # Text to display when the option is correct
    incorrect_text: str  # Text to display when the option is incorrect


class Question(BaseModel):
    question_id: str
    topic_id: Link[Topic]
    question: str
    answer: str
    options: list[QuestionOption]
    explanations: dict[str, QuestionOptionExplanation]  # Option ID -> Explanation


class QuizInsertForm(BaseModel):
    workspace_id: str
    title: str
    introduction: str
    questions: list[Question]


class Quiz(Document):
    workspace_id: Link[Workspace]
    title: str
    introduction: str
    questions: list[Question]
    created_at: datetime = datetime.now()

    @classmethod
    def get_ref(cls, workspace_id: str | PydanticObjectId):
        return DBRef(cls.Settings.name, workspace_id)

    @classmethod
    def from_form(cls, quiz_form: QuizInsertForm):
        return cls(
            workspace_id=quiz_form.workspace_id,
            title=quiz_form.title,
            introduction=quiz_form.introduction,
            questions=quiz_form.questions
        )

    class Settings:
        name = "quizzes"


# Question Attempt by a workspace for a question
class QuestionAttemptInsertForm(BaseModel):
    question_id: str
    answer: str
    created_at: datetime = datetime.now()


# Quiz Attempt by a workspace for quiz
class QuizAttemptInsertForm(BaseModel):
    quiz_id: str
    workspace_id: str
    answers: list[QuestionAttemptInsertForm]
    created_at: datetime = datetime.now()


class QuestionAttempt(BaseModel):
    question_id: str
    answer: str
    created_at: datetime = datetime.now()

    @classmethod
    def from_form(cls, attempt: QuestionAttemptInsertForm):
        return cls(
            question_id=attempt.question_id,
            answer=attempt.answer,
            created_at=attempt.created_at
        )


class QuizAttempt(Document):
    quiz_id: Link[Quiz]
    workspace_id: Link[Workspace]
    answers: list[QuestionAttempt]
    created_at: datetime = datetime.now()

    @classmethod
    def from_form(cls, quiz_attempt: QuizAttemptInsertForm):
        return cls(
            quiz_id=quiz_attempt.quiz_id,
            workspace_id=quiz_attempt.workspace_id,
            answers=[QuestionAttempt.from_form(answer) for answer in quiz_attempt.answers],
            created_at=quiz_attempt.created_at
        )

    def get_question_attempts(self) -> dict[str, QuestionAttempt]:
        question_attempts = {}

        for answer in self.answers:
            question_attempts[answer.question_id] = answer

        return question_attempts

    class Settings:
        name = "quiz_attempts"


class QuestionResultItem(BaseModel):
    correct: bool
    explanation: str

    @classmethod
    def from_question_attempt(cls, question: Question, attempt: QuestionAttempt):
        correct_answer = question.answer
        user_answer = attempt.answer

        if user_answer == correct_answer:
            return cls(
                correct=True,
                explanation=question.explanations[user_answer].correct_text
            )
        else:
            return cls(
                correct=False,
                explanation=question.explanations[user_answer].incorrect_text
            )


# Question to send in response
class QuestionResponse(BaseModel):
    question_id: str
    topic_id: str
    question: str
    options: list[QuestionOption]
    history: list[QuizAttempt]

    @classmethod
    def from_question(cls, question: Question, attempts: list[QuestionAttempt]):
        history = [QuestionResultItem.from_question_attempt(question, attempt) for attempt in attempts]

        return cls(
            question_id=question.question_id,
            topic_id=question.topic_id,
            question=question.question,
            options=question.options,
            history=history
        )


class QuizResultHistoryItem(BaseModel):
    score: int
    total: int
    timestamp: datetime


class QuizResponse(BaseModel):
    quiz_id: str
    title: str
    introduction: str
    questions: list[QuestionResponse]
    history: list[QuizResultHistoryItem]

    @classmethod
    def from_quiz(cls, quiz: Quiz, quiz_attempts: list[QuizAttempt]):
        question_attempts_history: dict[str, list[QuestionAttempt]] = defaultdict(list)

        history = []

        for quiz_attempt in quiz_attempts:
            question_attempts = quiz_attempt.get_question_attempts()

            for question_id, question_attempt in question_attempts.items():
                question_attempts_history[question_id].append(question_attempt)

            score, total = 0, len(quiz.questions)

            for question in quiz.questions:
                question: Question

                correct_answer = question.answer
                attempt_answer = question_attempts[question.question_id].answer

                score += (correct_answer == attempt_answer)

            history.append(QuizResultHistoryItem(
                score=score,
                total=total,
                timestamp=quiz_attempt.created_at
            ))

        for question_id in question_attempts_history:
            question_attempts_history[question_id].sort(key=lambda x: x.created_at)

        questions = [QuestionResponse.from_question(question, question_attempts_history[question.question_id])
                     for question in quiz.questions]

        return cls(
            quiz_id=str(quiz.id),
            title=quiz.title,
            introduction=quiz.introduction,
            questions=questions,
            history=history
        )


class QuizResultResponse(BaseModel):
    quiz_id: str
    results: dict[str, QuestionResultItem]  # Question ID -> QuestionResultItem
