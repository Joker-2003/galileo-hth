from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from server.db import Topic, TopicResponse, TopicInsertForm, Workspace

router = APIRouter(prefix="/topic", tags=["topic"])


@router.get("/workspace/{workspace_id}", response_model=List[TopicResponse])
async def get_topics_of_workspace(workspace_id: PydanticObjectId):
    topics = await Topic.find_many({"workspace_id": Workspace.get_ref(workspace_id)}).to_list()
    topics = [TopicResponse.from_topic(topic) for topic in topics]
    return topics


@router.get("/topic/{topic_id}", response_model=TopicResponse)
async def get_topic(topic_id: PydanticObjectId):
    topic = await Topic.get(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return TopicResponse.from_topic(topic)


@router.post("/topic/{topic_id}", response_model=TopicResponse)
async def mark_topic_done(topic_id: PydanticObjectId):
    topic = await Topic.get(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    topic.done = True
    await topic.update({Topic.done: True})
    return topic


@router.post("/")
async def add_topic_to_workspace(topic_form: TopicInsertForm):
    topic = Topic.from_form(topic_form)
    await topic.insert()
    return topic
