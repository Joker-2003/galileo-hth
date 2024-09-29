from typing import List

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


class Mindmap(BaseModel):
    title: str = Field(description="Title of the mindmap")
    content: str = Field(description="Content of the mindmap")


class MindmapGenerator:
    template: str = (
        """
        Create an informative mindmap based on the provided text ({content}).
        
        Below is an example of a mindmap:
        
        Barack Obama (born August 4, 1961) is an American politician who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, he was the first African-American president of the United States.
        
        mindmap
        \troot("Barack Obama")
        \t\t("Born August 4, 1961")
        \t\t::icon(fa fa-baby-carriage)
        \t\t("American Politician")
        \t\t\t::icon(fa fa-flag)
        \t\t\t\t("44th President of the United States")
        \t\t\t\t\t("2009 - 2017")
        \t\t("Democratic Party")
        \t\t\t::icon(fa fa-democrat)
        \t\t("First African-American President")
        cause and effects mindmap:
        mindmap
        \troot("Landlord sells apartment")
        \t\t::icon(fa fa-sell)
        \t\t("Renter must be notified of sale")
        \t\t::icon(fa fa-envelope)
        \t\t\t("Tenants may feel some uncertainty")
        \t\t\t::icon(fa fa-question-circle)
        \t\t("Notice periods must be observed")
        \t\t::icon(fa fa-calendar)
        \t\t\t("Landlord can submit notice of termination for personal use")
        \t\t\t::icon(fa fa-home)
        \t\t\t\t("Tenant has to look for a new apartment")
        \t\t\t\t::icon(fa fa-search)
        \t\t("New owner")
        \t\t::icon(fa fa-user)
        \t\t\t\t("New owner takes over existing rental agreement")
        \t\t\t\t::icon(fa fa-file-contract)
        \t\t\t\t\t\t("Tenant keeps previous apartment")
        \t\t\t\t\t\t::icon(fa fa-handshake)
        \t\t\t\t("New owner terminates newly concluded lease")
        \t\t\t\t::icon(fa fa-ban)
        \t\t\t\t\t\t("Tenant has to look for a new apartment")
        \t\t\t\t\t\t::icon(fa fa-search)
        Only one root, use free FontAwesome icons, and follow node types "[", "(". No need to use "mermaid", "\\`\\`\\`", or "graph TD". Respond only with code and syntax.`
        """
    )

    def __init__(self, model: str, api_key: str):
        self.parser = PydanticOutputParser(pydantic_object=Mindmap)
        self.prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        self.llm = ChatOpenAI(model_name=model, api_key=api_key, )
        self.chain = self.prompt | self.llm | self.parser

    def generate(self, content: str) -> Mindmap:
        query = self.template.format(content=content)
        return self.chain.invoke({"query": query})
