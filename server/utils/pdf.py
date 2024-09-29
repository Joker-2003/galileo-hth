import re

from langchain_community.document_loaders import PyMuPDFLoader

repeated_spaces = re.compile(r'\s+')


def load_pdf_text(file_path):
    loader = PyMuPDFLoader(file_path)
    documents = loader.load()
    text_content = " ".join([doc.page_content for doc in documents])
    text_content = repeated_spaces.sub(' ', text_content)

    return text_content
