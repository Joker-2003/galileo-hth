from dataclasses import field
from datetime import datetime
from typing import List

from beanie import Document, Link, BackLink
from bson import DBRef
from pydantic import BaseModel
from pydantic.v1 import Field

from .topic import Topic

from .workspace import Workspace


class FlashcardInsertForm(BaseModel):
    workspace_id: str
    group_id: str
    front: str
    back: str
    created_at: datetime = datetime.now()


class Flashcard(Document):
    workspace_id: Link[Workspace]
    front: str
    back: str
    deleted: bool = False
    created_at: datetime = datetime.now()

    @classmethod
    def from_form(cls, flashcard_form: FlashcardInsertForm):
        return cls(
            workspace_id=flashcard_form.workspace_id,
            front=flashcard_form.front,
            back=flashcard_form.back,
            created_at=flashcard_form.created_at
        )

    class Settings:
        name = "flashcards"


class FlashcardGroupInsertForm(BaseModel):
    workspace_id: str
    title: str
    description: str
    manual: bool
    created_at: datetime = datetime.now()


class FlashcardGroup(Document):
    workspace_id: Link[Workspace]
    title: str
    description: str
    manual: bool

    flashcards: list[Link[Flashcard]] = field(default_factory=list)

    created_at: datetime = datetime.now()

    @classmethod
    def from_form(cls, flashcard_group_form: FlashcardGroupInsertForm):
        return cls(
            workspace_id=flashcard_group_form.workspace_id,
            title=flashcard_group_form.title,
            description=flashcard_group_form.description,
            manual=flashcard_group_form.manual,
            created_at=flashcard_group_form.created_at
        )

    class Settings:
        name = "flashcard_groups"


class FlashcardReviewAttempt(Document):
    flashcard_id: Link[Flashcard]
    workspace_id: Link[Workspace]
    correct_count: int = 0
    incorrect_count: int = 0
    updated_at: datetime = datetime.now()

    class Settings:
        name = "flashcard_attempts"


class FlashcardReviewAttemptInsertForm(BaseModel):
    flashcard_id: str
    workspace_id: str
    correct: bool
    created_at: datetime = datetime.now()


class FlashcardResponse(BaseModel):
    workspace_id: str
    flashcard_id: str
    front: str
    back: str
    created_at: datetime

    @classmethod
    def from_flashcard(cls, flashcard: Flashcard):
        return cls(
            flashcard_id=str(flashcard.id),
            workspace_id=str(flashcard.workspace_id),
            front=flashcard.front,
            back=flashcard.back,
            created_at=flashcard.created_at
        )


class FlashcardGroupResponse(BaseModel):
    workspace_id: str
    group_id: str
    title: str
    description: str
    manual: bool
    flashcards: list[str]
    created_at: datetime

    @classmethod
    def from_flashcard_group(cls, flashcard_group: FlashcardGroup):
        return cls(
            workspace_id=str(flashcard_group.workspace_id),
            group_id=str(flashcard_group.id),
            title=flashcard_group.title,
            description=flashcard_group.description,
            manual=flashcard_group.manual,
            flashcards=[str(flashcard) for flashcard in flashcard_group.flashcards],
            created_at=flashcard_group.created_at
        )


class FlashcardAttemptResponse(BaseModel):
    flashcard_id: str
    workspace_id: str
    correct_count: int
    incorrect_count: int
    updated_at: datetime

    @classmethod
    def from_flashcard_attempt(cls, flashcard_attempt: FlashcardReviewAttempt):
        return cls(
            flashcard_id=str(flashcard_attempt.flashcard_id),
            workspace_id=str(flashcard_attempt.workspace_id),
            correct_count=flashcard_attempt.correct_count,
            incorrect_count=flashcard_attempt.incorrect_count,
            updated_at=flashcard_attempt.updated_at
        )
