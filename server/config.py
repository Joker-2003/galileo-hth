from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    google_api_key: str
    google_cse_id: str
    openai_api_key: str
    openai_llm_model: str
    mongodb_url: str
    mongodb_database: str
    qdrant_api_key: str

    image_directory: Path = Path('media/images')
    pdf_directory: Path = Path('media/pdfs')

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_settings():
    return Settings()
