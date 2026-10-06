import os
import chromadb
from sentence_transformers import SentenceTransformer

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Create ChromaDB client
client = chromadb.PersistentClient(path="rag/vectorstore")

# Create or get collection
collection = client.get_or_create_collection(
    name="campushira_documents"
)

# Folder containing RAG documents
documents_folder = "rag/documents"

# Read all text documents
for filename in os.listdir(documents_folder):

    if not filename.endswith(".txt"):
        continue

    file_path = os.path.join(documents_folder, filename)

    print(f"Processing: {filename}")

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:
        text = file.read()

    # Split document into chunks
    chunks = []

    for i in range(0, len(text), 500):

        chunk = text[i:i + 500].strip()

        if chunk:
            chunks.append(chunk)

    # Store chunks in ChromaDB
    for i, chunk in enumerate(chunks):

        embedding = embedding_model.encode(chunk).tolist()

        collection.upsert(
            ids=[f"{filename}_{i}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[{
                "source": filename
            }]
        )

    print(f"  Chunks stored: {len(chunks)}")


print()
print("RAG ingestion completed.")
print("Total chunks stored:", collection.count())