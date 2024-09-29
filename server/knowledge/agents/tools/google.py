import logging
from typing import AnyStr, Optional, Type

import grequests
from bs4 import BeautifulSoup
from googleapiclient.discovery import build
from langchain_community.utilities import SerpAPIWrapper
from pydantic import BaseModel, Field
from requests.models import Response

from .base import BaseTool

logger = logging.getLogger(__name__)


class GoogleSearchArgs(BaseModel):
    query: str = Field(..., description="a search query")


class GoogleSearchTool(BaseTool):
    SEARCH_API_SERVICE_NAME = 'customsearch'
    SEARCH_API_VERSION = 'v1'

    name: str = "google_search"
    description: str = (
        "A search engine retrieving top search results as snippets from Google. "
        "Input should be a search query."
    )

    args_schema: Optional[Type[BaseModel]] = GoogleSearchArgs

    def __init__(self, api_key: str, cse_id: str, _params: dict | None = None, /, **params):
        super().__init__(_params, **params)

        self.api_key = api_key
        self.cse_id = cse_id
        self.service = build(self.SEARCH_API_SERVICE_NAME, self.SEARCH_API_VERSION, developerKey=self.api_key)

    def _run_tool(self, query: AnyStr) -> str:
        logging.info(f"Starting search for query: {query}")

        try:
            api_response = self.service.cse().list(q=query, cx=self.cse_id, num=10).execute()
            logging.debug("Successfully retrieved API response.")
        except Exception as e:
            logging.error(f"Error retrieving API response: {e}")
            return f"Error: {e}"

        api_results = api_response.get('items', [])
        if not api_results:
            logging.warning("No results found for the query.")
            return "No results found."

        scraped_results = grequests.map([grequests.get(item['link']) for item in api_results])
        logging.debug(f"Completed {len(scraped_results)} requests for scraping.")

        results = []

        for api_result, response in zip(api_results, scraped_results):
            response: Response

            url = api_result['link']
            title = api_result['title']

            logging.info(f"Processing URL: {url}")

            if response is None:
                logging.error(f"Failed to fetch URL: {url} - No response received.")
                description = api_result['snippet']
            elif response.status_code != 200:
                logging.error(f"Failed to fetch URL: {url} - Status code: {response.status_code}")
                description = api_result['snippet']
            else:
                soup = BeautifulSoup(response.text, 'html.parser')
                if soup.title is not None:
                    title = soup.title.string
                description = '\n'.join([p.get_text() for p in soup.find_all('p')])
                logging.info(f"Successfully scraped content from URL: {url}")

            results.append({
                'title': title,
                'description': description,
                'url': url
            })

        output = '\n'.join(
            f"Title: {result['title']}\n"
            f"Description: {result['description']}\n"
            f"URL: {result['url']}\n"
            for result in results
        )

        return output


class SerpTool(BaseTool):
    name = "google_search"
    description = (
        "Worker that searches results from Google. Useful when you need to find short "
        "and succinct answers about a specific topic. Input should be a search query."
    )
    args_schema: Optional[Type[BaseModel]] = GoogleSearchArgs

    def _run_tool(self, query: AnyStr) -> str:
        tool = SerpAPIWrapper()
        evidence = tool.run(query)

        return evidence
