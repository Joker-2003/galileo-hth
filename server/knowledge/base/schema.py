# Modified from https://github.com/Cinnamon/kotaemon/blob/main/libs/kotaemon/kotaemon/base/schema.py
import uuid
from abc import ABC, abstractmethod
from datetime import datetime
from typing import TYPE_CHECKING, Any, Literal, Optional, TypeVar

from langchain.schema.messages import AIMessage as LCAIMessage
from langchain.schema.messages import HumanMessage as LCHumanMessage
from langchain.schema.messages import SystemMessage as LCSystemMessage
from llama_index.core.bridge.pydantic import Field
from llama_index.core.schema import Document as BaseDocument

IO_Type = TypeVar("IO_Type", "Document", str)
SAMPLE_TEXT = "A sample document for testing purposes."


class Document(BaseDocument):
    """
    Base document class, mostly inherited from Document class from llama-index.

    This class accept one positional argument `content` of an arbitrary type, which will
        store the raw content of the document. If specified, the class will use
        `content` to initialize the base llama_index class.

    Attributes:
        content: raw content of the document, can be anything
        source: id of the source of the Document. Optional.
        channel: the channel to show the document. Optional.:
            - chat: show in chat message
            - info: show in information panel
            - index: show in index panel
            - debug: show in debug panel
    """

    content: Any = None
    source: Optional[str] = None
    channel: Optional[Literal["chat", "info", "index", "debug", "plot"]] = None

    def __init__(self, content: Optional[Any] = None, *args, **kwargs):
        if content is None:
            if kwargs.get("text", None) is not None:
                kwargs["content"] = kwargs["text"]
            elif kwargs.get("embedding", None) is not None:
                kwargs["content"] = kwargs["embedding"]
                kwargs["text"] = "<EMBEDDING>"
        elif isinstance(content, Document):
            temp_ = content.dict()
            temp_.update(kwargs)
            kwargs = temp_
        else:
            kwargs["content"] = content
            if content:
                kwargs["text"] = str(content)
            else:
                kwargs["text"] = ""
        super().__init__(*args, **kwargs)

    def __bool__(self):
        return bool(self.content)

    @classmethod
    def example(cls) -> "Document":
        document = Document(
            text=SAMPLE_TEXT,
            metadata={
                "filename": "sample.pdf",
                "key": str(uuid.uuid4()),
                "content_type": "application/pdf",
                "uploaded_at": datetime.utcnow()
            },
        )
        return document

    def __str__(self):
        return str(self.content)


class DocumentWithEmbedding(Document):
    """Subclass of Document which must contains embedding

    Use this if you want to enforce component's IOs to must contain embedding.
    """

    def __init__(self, embedding: list[float], *args, **kwargs):
        kwargs["embedding"] = embedding
        super().__init__(*args, **kwargs)


class BaseMessage(Document, ABC):
    @abstractmethod
    def __add__(self, other: Any):
        ...

    @abstractmethod
    def to_dict(self) -> dict:
        ...


class SystemMessage(BaseMessage, LCSystemMessage, ABC):
    def to_dict(self) -> dict:
        return {"role": "system", "content": self.content}


class AIMessage(BaseMessage, LCAIMessage, ABC):
    def to_dict(self) -> dict:
        return {"role": "assistant", "content": self.content}


class HumanMessage(BaseMessage, LCHumanMessage, ABC):
    def to_dict(self) -> dict:
        return {"role": "user", "content": self.content}


class RetrievedDocument(Document):
    """Subclass of Document with retrieval-related information

    Attributes:
        score (float): score of the document (from 0.0 to 1.0)
        retrieval_metadata (dict): metadata from the retrieval process, can be used
            by different components in a retrieved pipeline to communicate with each
            other
    """

    score: float = Field(default=0.0)
    retrieval_metadata: dict = Field(default={})


class LLMInterface(AIMessage, ABC):
    candidates: list[str] = Field(default_factory=list)
    completion_tokens: int = -1
    total_tokens: int = -1
    prompt_tokens: int = -1
    total_cost: float = 0
    logits: list[list[float]] = Field(default_factory=list)
    messages: list[AIMessage] = Field(default_factory=list)
    logprobs: list[float] = []


class ExtractorOutput(Document):
    """
    Represents the output of an extractor.
    """

    matches: list[str]
