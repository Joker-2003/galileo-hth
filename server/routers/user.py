from datetime import datetime
from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import User, UserInsertForm, UserUpdateForm, Post, UserResponse, PostResponse

router = APIRouter(prefix="/user", tags=["user"], )


@router.post("/", response_model=UserResponse)
async def create_user(user_input: UserInsertForm):
    # Check if user already exists
    user = await User.find_one(User.email == user_input.email)
    if user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=user_input.email,
        password=user_input.password,
        first_name=user_input.first_name,
        last_name=user_input.last_name,
        occupation=user_input.occupation,
        education=user_input.education
    )
    await User.insert_one(user)

    return UserResponse.from_user(user)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: PydanticObjectId):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found by user_id")
    return UserResponse.from_user(user)


@router.get("/", response_model=UserResponse)
async def get_user_by_email(email: str):
    user = await User.find_one(User.email == email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found by email")
    return UserResponse.from_user(user)


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: PydanticObjectId, user_update: UserUpdateForm):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    updates = {}
    if user_update.email is not None:
        updates[User.email] = user_update.email
    if user_update.password is not None:
        updates[User.password] = user_update.password
    if user_update.first_name is not None:
        updates[User.first_name] = user_update.first_name
    if user_update.last_name is not None:
        updates[User.last_name] = user_update.last_name
    if user_update.occupation is not None:
        updates[User.occupation] = user_update.occupation
    if user_update.education is not None:
        updates[User.education] = user_update.education

    if updates:
        updates[User.last_updated_at] = datetime.utcnow()

    await user.set(updates)
    return UserResponse.from_user(user)


@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: PydanticObjectId):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Item not found")

    await User.delete(user)
    return {"status": "deleted"}


@router.get("/{user_id}/posts", response_model=List[PostResponse])
async def get_posts_from_user(user_id: PydanticObjectId):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    posts = await Post.find(Post.creator_id == user_id).to_list()
    if not posts:
        raise HTTPException(status_code=404, detail="No posts found for this user")

    return [PostResponse.from_post(post) for post in posts]
