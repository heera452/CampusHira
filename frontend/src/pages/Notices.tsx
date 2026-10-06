import { useEffect, useState } from "react";

type Notice = {
  id: number;
  title: string;
  content: string;
  published_date: string;
  file_url: string | null;
};

function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/notices/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        return response.json();
      })
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load notices.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading notices...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Notices
      </h1>

      <p className="mt-2 text-slate-500">
        Latest college announcements
      </p>

      <div className="mt-8 space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-800">
              {notice.title}
            </h2>

            <p className="mt-3 text-slate-600">
              {notice.content}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Published: {notice.published_date}
            </p>

            {notice.file_url && (
              <a
                href={`http://127.0.0.1:8000${notice.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
              >
                📄 View Notice
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notices;