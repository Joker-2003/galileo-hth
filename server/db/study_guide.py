from datetime import datetime
from typing import Optional

from beanie import Document, Indexed, Link
from pydantic import BaseModel

from .user import User


class DiscussionItem(BaseModel):
    answer: str
    difficulty: str
    prompt: str
    rating: int = 0


class ReferenceItem(BaseModel):
    content: str
    section_type: str
    title: str


class SectionItem(BaseModel):
    content: list[str]
    title: str


class OutlineItem(BaseModel):
    sections: list[SectionItem]
    title: str


class FlashCardItem(BaseModel):
    text: str
    definition: str
    distractors: list[str]


class StudyGuide(Document):  # Studyable
    creator_id: Link[User]
    title: str
    description: str
    slug: Indexed(str, unique=True)
    outline: list[OutlineItem]
    flashcards: list[FlashCardItem]
    reference: list[ReferenceItem]  # Quick Reference (Review Sheet)
    discussion: list[DiscussionItem]  # Essay Prompts
    word_lang: str
    def_lang: str
    num_terms: int
    created_at: datetime = datetime.now()
    last_modified: datetime = datetime.now()

    class Settings:
        name = "study_guides"


class ChatMessage(BaseModel):
    source: str  # user / assistant
    content: str
    model: Optional[str] = None
    created_at: datetime = datetime.now()


class ChatSession(Document):
    user_id: Link[User]
    study_guide_id: Link[StudyGuide]
    messages: list[ChatMessage]
    created_at: datetime = datetime.now()

    class Settings:
        name = "chat_sessions"
