import logging
import shutil
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated

from beanie import init_beanie
from fastapi import FastAPI, Depends
from motor.motor_asyncio import AsyncIOMotorClient

from server import config
from server.config import get_settings
from server.routers import (
    comment as comment_routes,
    flashcard as flashcard_routes,
    post as post_routes,
    quiz as quiz_routes,
    upload as upload_routes,
    user as user_routes,
    workspace as workspace_routes
)
from server.db import (
    User, Post, PostLike, Comment, CommentLike, DocumentStore,
    Quiz, QuizAttempt, Flashcard, FlashcardGroup, FlashcardReviewAttempt,
    Topic, Workspace
)

logging.basicConfig(level=logging.DEBUG, filename='logs/app.log', filemode='a',
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info("Initializing MongoDB connection...")
    client = AsyncIOMotorClient(settings.mongodb_url)
    await client.drop_database(settings.mongodb_database)
    database = client[settings.mongodb_database]
    await init_beanie(database, document_models=[
        User, Post, PostLike, Comment, CommentLike, DocumentStore,
        Quiz, QuizAttempt, Flashcard, FlashcardGroup, FlashcardReviewAttempt,
        Topic, Workspace
    ])
    logger.info("MongoDB connection established.")

    logger.info("Setting up media directories...")
    image_directory = Path(settings.image_directory)
    shutil.rmtree(image_directory)
    image_directory.mkdir(parents=True, exist_ok=True)
    pdf_directory = Path(settings.pdf_directory)
    shutil.rmtree(pdf_directory)
    pdf_directory.mkdir(parents=True, exist_ok=True)
    yield
    logger.info("Closing MongoDB connection...")
    client.close()


app = FastAPI(lifespan=lifespan)

app.include_router(user_routes.router)
app.include_router(post_routes.router)
app.include_router(comment_routes.router)
app.include_router(upload_routes.router)
app.include_router(quiz_routes.router)
app.include_router(flashcard_routes.router)
app.include_router(workspace_routes.router)


@app.get("/info")
async def info(settings: Annotated[config.Settings, Depends(get_settings)]):
    return {
        "google_api_key": settings.google_api_key,
        "google_cse_id": settings.google_cse_id,
        "openai_api_key": settings.openai_api_key,
        "mongodb_url": settings.mongodb_url,
        "mongodb_database": settings.mongodb_database,
        'qdrant_api_key': settings.qdrant_api_key,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
