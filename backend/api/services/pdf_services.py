import re

import pdfplumber


def extract_pdf_text(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    return text.strip()


def clean_json_with_regex(raw_json_str):
    """
    Clean a JSON string that might contain markdown code block syntax or other unwanted elements.
    Returns the cleaned JSON string.
    """
    # First try: Remove complete markdown code block
    pattern1 = r"^```(?:json)?[\r\n]+(.*?)```$"
    match1 = re.search(pattern1, raw_json_str, flags=re.DOTALL)
    if match1:
        return match1.group(1).strip()

    # Second try: Remove just the starting and ending markers if they exist
    cleaned = raw_json_str
    # Remove starting code block marker
    cleaned = re.sub(r"^```(?:json)?[\r\n]+", "", cleaned)
    # Remove ending code block marker
    cleaned = re.sub(r"[\r\n]+```$", "", cleaned)

    # Third try: Extract anything that looks like a JSON object
    if not cleaned.startswith("{"):
        json_match = re.search(r"(\{[\s\S]*\})", cleaned)
        if json_match:
            cleaned = json_match.group(1)

    return cleaned.strip()
