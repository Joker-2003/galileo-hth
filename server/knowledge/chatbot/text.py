from server.knowledge.llms import ChatLLM
from .base import BaseChatBot


class TextChatbot(BaseChatBot):
    """Simple text respondent chatbot that essentially wraps around a chat LLM"""

    llm: ChatLLM

    def _get_message(self) -> str:
        return self.llm(self.history).text
