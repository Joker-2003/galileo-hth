from server.knowledge.base.schema import AIMessage, BaseMessage, HumanMessage, SystemMessage

from .base import BaseLLM
from .branching import GatedBranchingPipeline, SimpleBranchingPipeline
from .chats import (
    AzureChatOpenAI,
    ChatLLM,
    ChatOpenAI,
    EndpointChatLLM,
    LCAnthropicChat,
    LCAzureChatOpenAI,
    LCChatOpenAI,
    LCWatsonChat,
    LCGeminiChat,
)
from .completions import LLM, AzureOpenAI, OpenAI, Watson
from .cot import ManualSequentialChainOfThought, Thought
from .linear import GatedLinearPipeline, SimpleLinearPipeline
from .prompts import BasePromptComponent, PromptTemplate

__all__ = [
    "BaseLLM",
    # chat-specific components
    "ChatLLM",
    "EndpointChatLLM",
    "BaseMessage",
    "HumanMessage",
    "AIMessage",
    "SystemMessage",
    "AzureChatOpenAI",
    "ChatOpenAI",
    "LCAnthropicChat",
    "LCGeminiChat",
    "LCWatsonChat",
    "LCAzureChatOpenAI",
    "LCChatOpenAI",
    # completion-specific components
    "LLM",
    "OpenAI",
    "Watson",
    "AzureOpenAI",
    # prompt-specific components
    "BasePromptComponent",
    "PromptTemplate",
    # strategies
    "SimpleLinearPipeline",
    "GatedLinearPipeline",
    "SimpleBranchingPipeline",
    "GatedBranchingPipeline",
    # chain-of-thoughts
    "ManualSequentialChainOfThought",
    "Thought",
]
