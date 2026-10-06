import { useEffect, useState } from "react";

type MarkRecord = {
  id: number;
  subject_id: number;
  subject_name: string;
  exam_type: string;
  marks_obtained: number;
  max_marks: number;
  percentage: number;
};

function Marks() {
  const [marks, setMarks] = useState<MarkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/marks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch marks");
        }

        return response.json();
      })
      .then((data) => {
        setMarks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load marks.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading marks...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Marks
      </h1>

      <p className="mt-2 text-slate-500">
        Your academic marks
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {marks.map((mark) => (
          <div
            key={mark.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-800">
              {mark.subject_name}
            </h2>

            <p className="mt-2 text-slate-500">
              {mark.exam_type}
            </p>

            <p className="mt-5 text-slate-600">
              Marks: {mark.marks_obtained} / {mark.max_marks}
            </p>

            <p className="mt-3 text-3xl font-bold text-blue-600">
              {mark.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marks;