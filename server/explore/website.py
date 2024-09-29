import os
from pprint import pprint
from typing import List

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from googleapiclient.discovery import build
from pydantic import BaseModel


class WebsiteRequestItem(BaseModel):
    title: str
    totalResults: int
    searchTerms: str
    count: int
    startIndex: int
    inputEncoding: str
    outputEncoding: str
    safe: str
    cx: str


class WebsiteRequest(BaseModel):
    request: list[WebsiteRequestItem]
    nextPage: list[WebsiteRequestItem]


class WebsiteSearchResultItem(BaseModel):
    kind: str
    title: str
    htmlTitle: str
    link: str
    displayLink: str
    snippet: str
    htmlSnippet: str
    formattedUrl: str
    htmlFormattedUrl: str
    pagemap: dict


class WebsiteSearchResponse(BaseModel):
    kind: str
    url: dict
    queries: WebsiteRequest
    context: dict
    searchInformation: dict
    items: List[WebsiteSearchResultItem]


class WebsiteService:
    SEARCH_API_SERVICE_NAME = 'customsearch'
    SEARCH_API_VERSION = 'v1'

    def __init__(self, api_key: str, cse_id: str):
        self.api_key = api_key
        self.cse_id = cse_id
        self.service = build(self.SEARCH_API_SERVICE_NAME, self.SEARCH_API_VERSION, developerKey=self.api_key)

    @classmethod
    async def scrape(cls, url: str) -> str:
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception(f"Failed to load page: {url}")

        soup = BeautifulSoup(response.content, "html.parser")

        paragraphs = soup.find_all('p')
        text_content = ' '.join(para.get_text() for para in paragraphs)

        return text_content

    def search(self, query, num: int = 10, **kwargs):
        response = self.service.cse().list(q=query, cx=self.cse_id, num=num, **kwargs).execute()
        return WebsiteSearchResponse(**response)


if __name__ == '__main__':
    load_dotenv()
    service = WebsiteService(os.environ['GOOGLE_API_KEY'], os.environ['GOOGLE_CSE_ID'])
    response = service.search('"god is a woman" "thank you next" "7 rings"', num=10)
    item = response.items[0]
    print(response)
    pprint(item.dict())
    print(service.scrape(item.link))
