import logging

import requests
from bs4 import BeautifulSoup
from googleapiclient.discovery import build

SEARCH_API_SERVICE_NAME = 'customsearch'
SEARCH_API_VERSION = 'v1'


def search_web(query: str, api_key: str, cse_id: str, num: int = 5):
    service = build(SEARCH_API_SERVICE_NAME, SEARCH_API_VERSION, developerKey=api_key)

    logging.info(f"Starting search for query: {query}")

    try:
        api_response = service.cse().list(q=query, cx=cse_id, num=num).execute()
        logging.debug("Successfully retrieved API response.")
    except Exception as e:
        logging.error(f"Error retrieving API response: {e}")
        return f"Error: {e}"

    api_results = api_response.get('items', [])
    if not api_results:
        logging.warning("No results found for the query.")
        return "No results found."

    scraped_results = [requests.get(item['link']) for item in api_results]
    logging.debug(f"Completed {len(scraped_results)} requests for scraping.")

    results = []

    for api_result, response in zip(api_results, scraped_results):
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
