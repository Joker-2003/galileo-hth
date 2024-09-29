import random
from typing import List

from beanie import PydanticObjectId, DeleteRules
from beanie.odm.operators.find.comparison import In
from beanie.odm.operators.update.array import AddToSet, Pop, Pull
from beanie.odm.operators.update.general import Set
from bson import DBRef
from fastapi import APIRouter, HTTPException

from server.db import (
    Flashcard, FlashcardInsertForm, FlashcardResponse,
    FlashcardGroup, FlashcardGroupInsertForm, FlashcardGroupResponse,
    FlashcardReviewAttempt, FlashcardReviewAttemptInsertForm, FlashcardAttemptResponse, Workspace
)

router = APIRouter(prefix="/flashcard", tags=["flashcard"])


@router.get("/card/id/{flashcard_id}", response_model=FlashcardResponse)
async def get_flashcard_by_id(flashcard_id: PydanticObjectId):
    flashcard = await Flashcard.get(flashcard_id)
    if not flashcard or flashcard.deleted:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return FlashcardResponse.from_flashcard(flashcard)


@router.get("/card/workspace/{workspace_id}", response_model=List[FlashcardResponse])
async def get_flashcards_by_workspace(workspace_id: PydanticObjectId):
    flashcards = await Flashcard.find_many({"workspace_id": Workspace.get_ref(workspace_id)}).to_list()
    flashcards = [FlashcardResponse.from_flashcard(flashcard)
                  for flashcard in flashcards if not flashcard.deleted]
    random.shuffle(flashcards)
    return flashcards


@router.get("/group/id/{group_id}", response_model=FlashcardGroupResponse)
async def get_flashcard_group_by_id(group_id: PydanticObjectId):
    flashcard_group = await FlashcardGroup.get(group_id)
    if not flashcard_group:
        raise HTTPException(status_code=404, detail="Flashcard group not found")
    return FlashcardGroupResponse.from_flashcard_group(flashcard_group)


@router.get("/group/workspace/{workspace_id}", response_model=List[FlashcardGroupResponse])
async def get_flashcard_groups_by_workspace(workspace_id: PydanticObjectId):
    flashcard_groups = await FlashcardGroup.find({
        "workspace_id": Workspace.get_ref(workspace_id)
    }).to_list()

    flashcard_groups = [FlashcardGroupResponse.from_flashcard_group(flashcard_group)
                        for flashcard_group in flashcard_groups]
    return flashcard_groups


@router.post("/review", response_model=FlashcardAttemptResponse)
async def review_flashcard(review_form: FlashcardReviewAttemptInsertForm):
    flashcard_id, workspace_id = review_form.flashcard_id, review_form.workspace_id

    flashcard = await Flashcard.get(flashcard_id)
    if not flashcard or flashcard.deleted:
        raise HTTPException(status_code=404, detail="Flashcard not found")

    attempt = await FlashcardReviewAttempt.get({"flashcard_id": flashcard_id})
    if not attempt:
        attempt = FlashcardReviewAttempt(
            flashcard_id=flashcard_id,
            workspace_id=workspace_id,
            correct_count=review_form.correct,
            incorrect_count=not review_form.correct
        )
    elif review_form.correct:
        await attempt.update(Set({
            FlashcardReviewAttempt.correct_count: attempt.correct_count + review_form.correct,
            FlashcardReviewAttempt.incorrect_count: attempt.correct_count + (not review_form.correct),
            FlashcardReviewAttempt.updated_at: review_form.created_at
        }))

    return attempt


@router.post("/group", response_model=FlashcardGroupResponse)
async def create_flashcard_group(group_form: FlashcardGroupInsertForm):
    flashcard_group = FlashcardGroup.from_form(group_form)
    await flashcard_group.insert()
    return FlashcardGroupResponse.from_flashcard_group(flashcard_group)


@router.post("/card", response_model=FlashcardResponse)
async def add_flashcard_to_group(flashcard_form: FlashcardInsertForm):
    flashcard_group = await FlashcardGroup.get(flashcard_form.group_id)
    if not flashcard_group:
        raise HTTPException(status_code=404, detail="Flashcard group not found")

    flashcard = await Flashcard.from_form(flashcard_form).insert()
    await flashcard_group.update(AddToSet({FlashcardGroup.flashcards: flashcard}))
    return FlashcardResponse.from_flashcard(flashcard)


@router.delete("/card/{flashcard_id}")
async def delete_flashcard(flashcard_id: PydanticObjectId):
    flashcard = await Flashcard.get(flashcard_id)
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")

    await flashcard.update(Set({Flashcard.deleted: True}))
    return {"message": "Flashcard deleted"}
