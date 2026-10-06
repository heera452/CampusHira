from app.services.gemini import ask_gemini
import chromadb
from sentence_transformers import SentenceTransformer


# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to ChromaDB
client = chromadb.PersistentClient(path="rag/vectorstore")

# Get CampusHira documents
collection = client.get_collection(
    name="campushira_documents"
)


def ask_ai_assistant(question: str, student_context: str = ""):

    # Convert question into embedding
    question_embedding = embedding_model.encode(question).tolist()

    # Search RAG documents
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=2
    )

    documents = results["documents"][0]

    # Combine retrieved documents
    context = "\n\n".join(documents)

    # Create prompt for Gemini
    prompt = f"""
You are the CampusHira AI Assistant.

Answer the student's question using the college information
and student information provided below.

College information:
{context}

Student information:
{student_context}

Student question:
{question}

Rules:
- Answer clearly and simply.
- Use the provided college information and student information.
- If the requested information is not available, say that the information is not available.
- Do not invent student information.
"""

    # Ask Gemini
    answer = ask_gemini(prompt)

    # Determine sources
    sources = []

    if student_context.strip():
        sources.append("ERP Database")

    if documents:
        sources.append("attendance_policy.txt")

    return {
        "question": question,
        "answer": answer,
        "sources": sources
    }