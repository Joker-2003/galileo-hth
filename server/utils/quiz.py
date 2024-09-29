from typing import List

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


class QuestionOption(BaseModel):
    option_id: str = Field(description="Option ID (A/B/C/D)")
    description: str = Field(description="Option description")
    correct_text: str = Field(description="Text to display when the option is correctly selected. "
                                          "Make sure it clearly explains why the option is correct.")
    incorrect_text: str = Field(
        description="Text to display when the option is incorrectly selected (not needed for correct option)")


class Question(BaseModel):
    question: str = Field(description="Question text")
    answer: str = Field(description="Correct answer (A/B/C/D)")
    options: List[QuestionOption] = Field(description="List of options")


class Quiz(BaseModel):
    title: str = Field(description="Title of the quiz")
    introduction: str = Field(description="Introduction / Brief Description of the quiz")
    questions: list[Question]


class QuizGenerator:
    template: str = (
        "Generate an informative multiple-choice quiz (up to 10 questions) with 4 options each based on the provided text ({content}). "
        "Make sure there is only one correct answer for each question, but the other options shouldn't be too unrelated. "
        "Please ensure your responses are concise. Don't include any unnecessary information. "
        "Follow this guideline to ensure accurate and organized data extraction."
    )

    def __init__(self, model: str, api_key: str):
        self.parser = PydanticOutputParser(pydantic_object=Quiz)
        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        self.llm = ChatOpenAI(model_name=model, api_key=api_key, )
        self.chain = self.prompt | self.llm | self.parser

    def parse(self, content: str) -> List[Quiz]:
        query = self.template.format(content=content)
        return self.chain.invoke({"query": query})
