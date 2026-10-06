import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    const userQuestion = question;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/ai/ask?question=${encodeURIComponent(
          userQuestion
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to get AI response");
      }

      let answer = "";

      if (typeof data.answer === "string") {
        answer = data.answer;
      } else if (data.answer) {
        answer = JSON.stringify(data.answer, null, 2);
      } else {
        answer = "No answer received from AI Assistant.";
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: answer,
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        AI Assistant
      </h1>

      <p className="mt-2 text-slate-500">
        Ask questions about your academics, attendance, marks, and timetable.
      </p>

      <div className="mt-8 max-w-4xl rounded-xl bg-white p-6 shadow">

        <div className="min-h-[400px] space-y-4">

          {messages.length === 0 && (
            <div className="rounded-xl bg-blue-50 p-6 text-blue-700">
              <p className="font-semibold">
                Hello! I'm your CampusHira AI Assistant.
              </p>

              <p className="mt-2">
                You can ask me things like:
              </p>

              <ul className="mt-3 list-disc pl-5">
                <li>What is my attendance?</li>
                <li>What are my marks?</li>
                <li>What is my timetable?</li>
                <li>What is my Machine Learning mark?</li>
              </ul>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "ml-auto max-w-[80%] rounded-xl bg-blue-600 p-4 text-white"
                  : "max-w-[80%] rounded-xl bg-slate-100 p-4 text-slate-800"
              }
            >
              <p className="text-sm font-semibold">
                {message.role === "user"
                  ? "You"
                  : "CampusHira AI"}
              </p>

              <p className="mt-2 whitespace-pre-wrap">
                {message.content}
              </p>

              {message.role === "assistant" &&
                message.sources &&
                message.sources.length > 0 && (
                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <p className="text-xs font-semibold text-slate-500">
                      Sources
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.sources.map((source, sourceIndex) => (
                        <span
                          key={sourceIndex}
                          className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}

          {loading && (
            <div className="max-w-[80%] rounded-xl bg-slate-100 p-4 text-slate-500">
              CampusHira AI is thinking...
            </div>
          )}

        </div>

        <div className="mt-6 flex gap-3">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
            placeholder="Ask something about your academics..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ask
          </button>

        </div>

      </div>
    </div>
  );
}

export default AIAssistant;