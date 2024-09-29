from typing import List

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


class Flashcard(BaseModel):
    front: str = Field(description="Term or Question")
    back: str = Field(description="Definition of the term or Answer to the question")


class FlashcardSet(BaseModel):
    cards: List[Flashcard] = Field(description="List of flashcards")


class FlashcardGenerator:
    template: str = (
        "Extract relevant terms or questions from the provided text ({content}). "
        "You can summarize for better understanding and conciseness. "
        "Please ensure your responses are very concise for easy review. "
        "Make sure front and back of the flashcard are clearly defined and the front can be answered by back. "
        "Don't include any unnecessary information. "
        "Follow this guideline to ensure accurate and organized data extraction."
    )

    def __init__(self, model: str, api_key: str):
        self.parser = PydanticOutputParser(pydantic_object=FlashcardSet)
        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        self.llm = ChatOpenAI(model_name=model, api_key=api_key)
        self.chain = self.prompt | self.llm | self.parser

    def generate(self, content: str) -> List[Flashcard]:
        query = self.template.format(content=content)
        results = self.chain.invoke({"query": query})
        return results.cards
