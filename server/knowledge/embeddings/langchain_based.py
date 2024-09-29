import logging
import os
import typing
from typing import Optional

from server.knowledge.base import DocumentWithEmbedding, Param

from .base import BaseEmbeddings

if typing.TYPE_CHECKING:
    from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes

logger = logging.getLogger(__name__)


class LCEmbeddingMixin:
    def _get_lc_class(self):
        raise NotImplementedError(
            "Please return the relevant Langchain class in in _get_lc_class"
        )

    def __init__(self, **params):
        self._lc_class = self._get_lc_class()
        self._obj = self._lc_class(**params)
        self._kwargs: dict = params

        super().__init__()

    def run(self, text):
        input_docs = self.prepare_input(text)
        input_ = [doc.text for doc in input_docs]

        embeddings = self._obj.embed_documents(input_)

        return [
            DocumentWithEmbedding(content=doc, embedding=each_embedding)
            for doc, each_embedding in zip(input_docs, embeddings)
        ]

    def __repr__(self):
        kwargs = []
        for key, value_obj in self._kwargs.items():
            value = repr(value_obj)
            kwargs.append(f"{key}={value}")
        kwargs_repr = ", ".join(kwargs)
        return f"{self.__class__.__name__}({kwargs_repr})"

    def __str__(self):
        kwargs = []
        for key, value_obj in self._kwargs.items():
            value = str(value_obj)
            if len(value) > 20:
                value = f"{value[:15]}..."
            kwargs.append(f"{key}={value}")
        kwargs_repr = ", ".join(kwargs)
        return f"{self.__class__.__name__}({kwargs_repr})"

    def __setattr__(self, name, value):
        if name == "_lc_class":
            return super().__setattr__(name, value)

        if name in self._lc_class.__fields__:
            self._kwargs[name] = value
            self._obj = self._lc_class(**self._kwargs)
        else:
            super().__setattr__(name, value)

    def __getattr__(self, name):
        if name in self._kwargs:
            return self._kwargs[name]
        return getattr(self._obj, name)

    def dump(self, *args, **kwargs):
        from theflow.utils.modules import serialize

        params = {key: serialize(value) for key, value in self._kwargs.items()}
        return {
            "__type__": f"{self.__module__}.{self.__class__.__qualname__}",
            **params,
        }

    def specs(self, path: str):
        path = path.strip(".")
        if "." in path:
            raise ValueError("path should not contain '.'")

        if path in self._lc_class.__fields__:
            return {
                "__type__": "theflow.base.ParamAttr",
                "refresh_on_set": True,
                "strict_type": True,
            }

        raise ValueError(f"Invalid param {path}")


class LCWatsonEmbeddings(LCEmbeddingMixin, BaseEmbeddings):
    """Wrapper around Langchain's Watson embedding, focusing on key parameters"""

    ibm_api_key: str = Param(
        help="https://medium.com/@harangpeter/setting-up-ibm-watsonx-ai-for-api-based-text-inference-435ef6d1a6a3",
        default=None,
        required=True,
    )
    model_id: str = Param(
        help="Model name to use (https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-models-embed.html)",
        default=None,
        required=True,
    )
    project_id: str = Param(
        help="Project ID (https://cloud.ibm.com/resource-library)",
        default=None,
        required=True,
    )
    params: dict = Param(
        help="Embedding parameters to pass to the model",
        default=None,
        required=False,
    )

    def __init__(
            self,
            model_id: str | "EmbeddingTypes" = "ibm/slate-125m-english-rtrvr",
            project_id: Optional[str] = None,
            ibm_api_key: Optional[str] = None,
            params: Optional[dict] = None,
    ):
        from ibm_watsonx_ai import Credentials, APIClient
        from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes

        if isinstance(model_id, str):
            # Check if model is a valid IBM embedding model
            model_id = EmbeddingTypes(model_id).value
        else:
            model_id = model_id.value

        params = params or {}

        credentials = Credentials(
            url="https://us-south.ml.cloud.ibm.com",
            api_key=ibm_api_key
        )
        watsonx_client = APIClient(credentials)

        super().__init__(
            model_id=model_id,
            project_id=project_id,
            watsonx_client=watsonx_client,
            params=params,
        )

    def _get_lc_class(self):
        from langchain_ibm import WatsonxEmbeddings

        return WatsonxEmbeddings


class LCOpenAIEmbeddings(LCEmbeddingMixin, BaseEmbeddings):
    """Wrapper around Langchain's OpenAI embedding, focusing on key parameters"""

    def __init__(
            self,
            model: str = "text-embedding-ada-002",
            openai_api_version: Optional[str] = None,
            openai_api_base: Optional[str] = None,
            openai_api_type: Optional[str] = None,
            openai_api_key: Optional[str] = None,
            request_timeout: Optional[float] = None,
            **params,
    ):
        super().__init__(
            model=model,
            openai_api_version=openai_api_version,
            openai_api_base=openai_api_base,
            openai_api_type=openai_api_type,
            openai_api_key=openai_api_key,
            request_timeout=request_timeout,
            **params,
        )

    def _get_lc_class(self):
        try:
            from langchain_openai import OpenAIEmbeddings
        except ImportError:
            from langchain.embeddings import OpenAIEmbeddings

        return OpenAIEmbeddings


class LCAzureOpenAIEmbeddings(LCEmbeddingMixin, BaseEmbeddings):
    """Wrapper around Langchain's AzureOpenAI embedding, focusing on key parameters"""

    def __init__(
            self,
            azure_endpoint: Optional[str] = None,
            deployment: Optional[str] = None,
            openai_api_key: Optional[str] = None,
            api_version: Optional[str] = None,
            request_timeout: Optional[float] = None,
            **params,
    ):
        super().__init__(
            azure_endpoint=azure_endpoint,
            deployment=deployment,
            api_version=api_version,
            openai_api_key=openai_api_key,
            request_timeout=request_timeout,
            **params,
        )

    def _get_lc_class(self):
        try:
            from langchain_openai import AzureOpenAIEmbeddings
        except ImportError:
            from langchain.embeddings import AzureOpenAIEmbeddings

        return AzureOpenAIEmbeddings


class LCCohereEmbeddings(LCEmbeddingMixin, BaseEmbeddings):
    """Wrapper around Langchain's Cohere embedding, focusing on key parameters"""

    cohere_api_key: str = Param(
        help="API key (https://dashboard.cohere.com/api-keys)",
        default=None,
        required=True,
    )
    model: str = Param(
        help="Model name to use (https://docs.cohere.com/docs/models)",
        default=None,
        required=True,
    )
    user_agent: str = Param(
        help="User agent (leave default)", default="default", required=True
    )

    def __init__(
            self,
            model: str = "embed-english-v2.0",
            cohere_api_key: Optional[str] = None,
            truncate: Optional[str] = None,
            request_timeout: Optional[float] = None,
            **params,
    ):
        super().__init__(
            model=model,
            cohere_api_key=cohere_api_key,
            truncate=truncate,
            request_timeout=request_timeout,
            **params,
        )

    def _get_lc_class(self):
        try:
            from langchain_community.embeddings import CohereEmbeddings
        except ImportError:
            from langchain.embeddings import CohereEmbeddings

        return CohereEmbeddings


class LCHuggingFaceEmbeddings(LCEmbeddingMixin, BaseEmbeddings):
    """Wrapper around Langchain's HuggingFace embedding, focusing on key parameters"""

    model_name: str = Param(
        help=(
            "Model name to use (https://huggingface.co/models?"
            "pipeline_tag=sentence-similarity&sort=trending)"
        ),
        default=None,
        required=True,
    )

    def __init__(
            self,
            model_name: str = "sentence-transformers/all-mpnet-base-v2",
            **params,
    ):
        super().__init__(
            model_name=model_name,
            **params,
        )

    def _get_lc_class(self):
        try:
            from langchain_community.embeddings import HuggingFaceBgeEmbeddings
        except ImportError:
            from langchain.embeddings import HuggingFaceBgeEmbeddings

        return HuggingFaceBgeEmbeddings
