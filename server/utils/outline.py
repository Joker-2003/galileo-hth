from typing import List

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


class Section(BaseModel):
    title: str = Field(description="Title of the section")
    content: str = Field(description="Content of the section")


class Outline(BaseModel):
    title: str = Field(description="Title of the outline")
    sections: List[Section] = Field(description="List of sections")


class OutlineGenerator:
    template: str = (
        "Generate an concise outline (combination of bullet-points with sentences) for reviewing complex topics"
        " based on the provided text ({content}). "
        "Follow this guideline to ensure accurate and organized data extraction."
    )

    def __init__(self, model: str, api_key: str):
        self.parser = PydanticOutputParser(pydantic_object=Outline)
        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        self.llm = ChatOpenAI(model_name=model, api_key=api_key, )
        self.chain = self.prompt | self.llm | self.parser

    def parse(self, content: str) -> List[Outline]:
        query = self.template.format(content=content)
        return self.chain.invoke({"query": query})
