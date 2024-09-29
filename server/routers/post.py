from datetime import datetime
from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import User, Post, PostLike, PostInsertForm, CommentInsertForm, CommentResponse, Comment
from server.db.post import PostUpdateForm, PostLikeInsertForm, PostLikeResponse, PostResponse

router = APIRouter(prefix="/post", tags=["post"])


@router.post("", response_model=PostResponse)
async def create_post(post_form: PostInsertForm):
    creator = await User.get(post_form.creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    post = Post(
        title=post_form.title,
        content=post_form.content,
        creator_id=creator,
        thumbnail_image=post_form.thumbnail_image
    )

    await Post.insert(post)
    return PostResponse.from_post(post)


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: PydanticObjectId):
    post = await Post.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return PostResponse.from_post(post)


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(post_id: PydanticObjectId, update_form: PostUpdateForm):
    post = await Post.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    updates = {}
    if update_form.title:
        updates[Post.title] = update_form.title
    if update_form.content:
        updates[Post.content] = update_form.content
    if update_form.thumbnail_image:
        updates[Post.thumbnail_image] = update_form.thumbnail_image

    if updates:
        updates[Post.updated_at] = datetime.utcnow()

    await post.update(post)
    return PostResponse.from_post(post)


@router.delete("/{post_id}", response_model=dict)
async def delete_post(post_id: PydanticObjectId):
    post = await Post.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    await Post.delete(post)
    return {"message": "Post deleted successfully"}


@router.post("/like", response_model=PostLikeResponse)
async def like_post(post_like: PostLikeInsertForm):
    user = await User.get(post_like.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    post = await Post.get(post_like.post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    like = PostLike(
        user_id=user,
        post_id=post,
        value=post_like.value
    )
    await PostLike.insert(like)

    return PostLikeResponse.from_post_like(like)


@router.get("/{post_id}/likes", response_model=List[PostLikeResponse])
async def get_likes_for_post(post_id: PydanticObjectId):
    post = await Post.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    likes = await PostLike.find(PostLike.post_id == post_id).to_list()
    return [PostLikeResponse.from_post_like(like) for like in likes]


@router.delete("/{post_id}/likes/{user_id}", response_model=dict)
async def delete_like(post_id: PydanticObjectId, user_id: PydanticObjectId):
    like = await PostLike.find_one(
        PostLike.post_id == post_id,
        PostLike.user_id == user_id
    )

    if not like:
        raise HTTPException(status_code=404, detail="Like not found")

    await PostLike.delete(like)
    return {"message": "Like deleted successfully"}


@router.post("/comments", response_model=CommentResponse)
async def create_comment(comment_form: CommentInsertForm):
    user = await User.get(comment_form.user_id)
    post = await Post.get(comment_form.post_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment = Comment(
        user_id=user,
        post_id=post,
        parent_id=comment_form.parent_id,
        content=comment_form.content,
    )
    await Comment.insert(comment)

    return CommentResponse.from_comment(comment)


@router.get("/{post_id}/comments", response_model=List[CommentResponse])
async def get_comments_for_post(post_id: PydanticObjectId):
    post = await Post.get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comments = await Comment.find(Comment.post_id == post_id).to_list()

    return [CommentResponse.from_comment(comment) for comment in comments]
