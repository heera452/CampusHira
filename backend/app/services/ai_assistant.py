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
    metadatas = results["metadatas"][0]

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
- When student information is available, use it to give personalized answers.
- When college policy information is available, use it to explain the relevant policy.
- If both student information and college information are relevant, combine them.
"""

    # Ask Gemini
    answer = ask_gemini(prompt)

    # Determine sources
    sources = []

    # Student information came from ERP database
    if student_context.strip():
        sources.append("ERP Database")

    # Get actual document sources from ChromaDB
    for metadata in metadatas:

        source = metadata.get("source")

        if source and source not in sources:
            sources.append(source)

    return {
        "question": question,
        "answer": answer,
        "sources": sources
    }