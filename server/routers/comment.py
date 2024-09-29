from datetime import datetime
from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import CommentResponse, Comment, User
from server.db.comment import CommentUpdateForm, CommentLikeResponse, CommentLikeInsertForm, CommentLike

router = APIRouter(prefix="/comment", tags=["comment"])


@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment(comment_id: PydanticObjectId, update_form: CommentUpdateForm):
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    updates = {}
    if update_form.content:
        updates[Comment.content] = update_form.content

    if updates:
        updates[Comment.content] = datetime.utcnow()

    await comment.update(updates)

    return CommentResponse.from_comment(comment)


@router.delete("/{comment_id}", response_model=dict)
async def delete_comment(comment_id: PydanticObjectId):
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    await Comment.delete(comment)
    return {"message": "Comment deleted successfully"}


@router.post("/like", response_model=CommentLikeResponse)
async def like_comment(like_form: CommentLikeInsertForm):
    user = await User.get(like_form.user_id)
    comment = await Comment.get(like_form.comment_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    existing_like = await CommentLike.find_one(
        CommentLike.user_id == user.id,
        CommentLike.comment_id == comment.id
    )
    if existing_like:
        if existing_like.value == like_form.value:
            raise HTTPException(status_code=400, detail="You have already performed this action")

        updates = {CommentLike.value: like_form.value, CommentLike.created_at: datetime.utcnow()}
        await existing_like.update(updates)

        return CommentLikeResponse.from_comment_like(existing_like)
    else:
        new_like = CommentLike(
            user_id=user,
            comment_id=comment,
            value=like_form.value
        )
        await CommentLike.insert(new_like)
        return CommentLikeResponse.from_comment_like(new_like)


@router.get("/{comment_id}/likes", response_model=List[CommentLikeResponse])
async def get_likes_for_comment(comment_id: PydanticObjectId):
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    likes = await CommentLike.find(CommentLike.comment_id == comment_id).to_list()

    return [CommentLikeResponse.from_comment_like(like) for like in likes]


@router.delete("/{comment_id}/likes/{user_id}", response_model=dict)
async def delete_like_for_comment(comment_id: PydanticObjectId, user_id: PydanticObjectId):
    like = await CommentLike.find_one(
        CommentLike.comment_id == comment_id,
        CommentLike.user_id == user_id
    )

    if not like:
        raise HTTPException(status_code=404, detail="Like not found")

    await CommentLike.delete(like)
    return {"message": "Like deleted successfully"}
