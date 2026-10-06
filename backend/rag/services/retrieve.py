import chromadb
from sentence_transformers import SentenceTransformer

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to ChromaDB
client = chromadb.PersistentClient(path="rag/vectorstore")

# Get document collection
collection = client.get_collection(
    name="campushira_documents"
)


def retrieve_documents(question: str, n_results: int = 2):
    """
    Retrieve the most relevant college documents
    for the given question.
    """

    # Convert question into embedding
    question_embedding = embedding_model.encode(
        question
    ).tolist()

    # Search ChromaDB
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=n_results
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    retrieved_documents = []

    for document, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):
        retrieved_documents.append({
            "document": document,
            "source": metadata.get(
                "source",
                "Unknown"
            ),
            "distance": distance
        })

    return retrieved_documents


# Test retrieval when this file is run directly
if __name__ == "__main__":

    question = input("Ask a question: ")

    results = retrieve_documents(question)

    print("\nRelevant information:")
    print("----------------------")

    for result in results:

        print(
            f"Source: {result['source']}"
        )

        print(
            f"Distance: {result['distance']:.4f}"
        )

        print(
            result["document"]
        )

        print()