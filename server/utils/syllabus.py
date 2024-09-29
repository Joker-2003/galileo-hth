import os
from typing import List, Tuple, Optional

from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai.foundation_models.utils.enums import (
    ModelTypes
)
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_ibm import WatsonxLLM


class ScheduleItem(BaseModel):
    day: str = Field(description="Day of the week")
    time: str = Field(description="Time of the schedule item")
    location: str = Field(description="Location of the schedule item")
    section: str = Field(description="Section of the schedule item")
    type: str = Field(description="Type of schedule item (e.g., lecture, tutorial, lab)")


class Syllabus(BaseModel):
    name: str = Field(description="Name of the course")
    code: str = Field(description="Course number or code")
    schedule: List[ScheduleItem] = Field(
        description="Day, Time, Location, and Section of lectures, tutorials, and labs")
    overview: str = Field(description="Concise overview of the course content and objectives with complete sentences")
    prerequisites: Optional[str] = Field(description="Course prerequisites")
    corequisites: Optional[str] = Field(description="Course co-requisites")
    exclusions: Optional[str] = Field(description="List of courses excluded from this one")
    topics: List[Tuple[int, str]] = Field(
        description="List of topics covered in the course, with week number as first element, and topic as second")


class SyllabusParser:
    template: str = (
        "Extract and summarize the relevant information from the provided course syllabus ({content}). "
        "Please ensure your responses are concise. If the required information is not available within the text, "
        "indicate this by entering 'null'. Note that the necessary details may not be found in a continuous section "
        "of the text; therefore, if there are multiple pieces of relevant information, list each one separately in the appropriate fields. "
        "Follow this guideline to ensure accurate and organized data extraction."
    )

    def __init__(self, api_client: APIClient, gen_params: dict = None):
        if gen_params is not None:
            gen_params = {GenParams.MAX_NEW_TOKENS: 2000}

        self.parser = PydanticOutputParser(pydantic_object=Syllabus)
        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        self.llm = WatsonxLLM(
            model_id=ModelTypes.MIXTRAL_8X7B_INSTRUCT_V01,
            project_id=os.environ["IBM_PROJECT_ID"],
            watsonx_client=api_client,
            params=gen_params,
        )
        self.chain = self.prompt | self.llm | self.parser

    def parse(self, content: str) -> Syllabus:
        query = self.template.format(content=content)
        return self.chain.invoke({"query": query})
