import pdfplumber


def extract_pdf_text(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    return text.strip()


pdf = "media/resume/NadeemAhmad.pdf"
print(extract_pdf_text(pdf))
