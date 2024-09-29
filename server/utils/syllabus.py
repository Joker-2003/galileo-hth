from typing import List

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


class TopicItem(BaseModel):
    week: int = Field(description="Week number of the topic")
    name: str = Field(description="Name of the topic")
    terms: List[str] = Field(description="List of terms related to the topic")
    questions: List[str] = Field(description="List of common questions related to the topic")
    summary: str = Field(description="Summary of the topic")


class Syllabus(BaseModel):
    name: str = Field(description="Name of the course")
    code: str = Field(description="Course number or code")
    overview: str = Field(description="Concise overview of the course content and objectives with complete sentences")
    topics: List[TopicItem] = Field(
        description="List of topics covered in the course, with terms, questions, and summaries."
    )


class SyllabusParser:
    template: str = (
        "Extract and summarize the relevant information and generate a complete overview of the course with detailed "
        "information based on the provided topics in the syllabus and your knowledge."
        "For each topic also generate relevant information such as terms, common questions, and a summary for each topic."
        "Ensure that the generated content is accurate and informative."
        "Syllabus: ({content})"
    )

    def __init__(self, model: str, api_key: str):
        self.parser = PydanticOutputParser(pydantic_object=Syllabus)

        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )

        self.llm = ChatOpenAI(model_name=model, api_key=api_key)
        self.chain = self.prompt | self.llm | self.parser

    def parse(self, content: str) -> Syllabus:
        query = self.template.format(content=content)
        return self.chain.invoke({"query": query})
