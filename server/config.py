from functools import lru_cache
from pathlib import Path

import boto3
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    google_api_key: str
    google_cse_id: str
    openai_api_key: str
    openai_chat_model: str
    openai_complete_model: str
    mongodb_url: str
    mongodb_database: str
    qdrant_api_key: str
    s3_bucket_name: str

    image_directory: Path = Path('media/images')
    pdf_directory: Path = Path('media/pdfs')

    model_config = SettingsConfigDict(env_file=".env")

    def get_s3_client(self):
        return boto3.client(
            "s3",
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.aws_region
        )


@lru_cache
def get_settings():
    return Settings()
