import { useState } from "react";

type WhatIfResult = {
  current_attended: number;
  current_total: number;
  current_percentage: number;
  future_classes: number;
  future_attended: number;
  projected_attended: number;
  projected_total: number;
  projected_percentage: number;
  subject_id: number;
  subject_name: string;
  internal_marks: number;
  max_marks: number;
  internal_marks_percentage: number;
  academic_risk: string;
};

const subjects = [
  { id: 1, name: "Machine Learning" },
  { id: 3, name: "Natural Language Processing" },
  { id: 4, name: "Fundamentals of Computer Vision" },
  { id: 5, name: "Computer Networks" },
  { id: 6, name: "MLOps" },
];

function WhatIf() {
  const [subjectId, setSubjectId] = useState("1");
  const [futureClasses, setFutureClasses] = useState("");
  const [futureAttended, setFutureAttended] = useState("");
  const [result, setResult] = useState<WhatIfResult | null>(null);
  const [error, setError] = useState("");

  const calculateWhatIf = async () => {
    setError("");
    setResult(null);

    if (!futureClasses || !futureAttended) {
      setError("Please enter future classes and classes you will attend.");
      return;
    }

    if (
      Number(futureClasses) < 0 ||
      Number(futureAttended) < 0
    ) {
      setError("Class values cannot be negative.");
      return;
    }

    if (
      Number(futureAttended) > Number(futureClasses)
    ) {
      setError(
        "Classes attended cannot be greater than future classes."
      );
      return;
    }

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/what-if/attendance?subject_id=${subjectId}&future_classes=${futureClasses}&future_attended=${futureAttended}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to calculate result"
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        What-If Simulator
      </h1>

      <p className="mt-2 text-slate-500">
        See how your future attendance can affect your academic risk.
      </p>

      <div className="mt-8 max-w-2xl rounded-xl bg-white p-6 shadow">

        <h2 className="text-xl font-semibold text-slate-800">
          Attendance Simulation
        </h2>

        <div className="mt-6 grid gap-5">

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Select Subject
            </label>

            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Future classes */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Number of future classes
            </label>

            <input
              type="number"
              min="0"
              value={futureClasses}
              onChange={(e) =>
                setFutureClasses(e.target.value)
              }
              placeholder="Example: 10"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Future attended */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Classes you will attend
            </label>

            <input
              type="number"
              min="0"
              value={futureAttended}
              onChange={(e) =>
                setFutureAttended(e.target.value)
              }
              placeholder="Example: 8"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={calculateWhatIf}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Calculate
          </button>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 max-w-2xl rounded-xl bg-red-50 p-5 text-red-600">
          <p className="font-semibold">
            Error
          </p>

          <p className="mt-1">
            {error}
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 max-w-3xl">

          <h2 className="text-2xl font-bold text-slate-800">
            Simulation Result
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">
                Current Attendance
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-800">
                {result.current_percentage}%
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">
                Projected Attendance
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {result.projected_percentage}%
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow">
              <p className="text-sm text-slate-500">
                Academic Risk
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {result.academic_risk}
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-xl bg-white p-6 shadow">

            <h3 className="text-lg font-semibold">
              {result.subject_name}
            </h3>

            <div className="mt-4 space-y-2 text-slate-600">

              <p>
                Current: {result.current_attended} /{" "}
                {result.current_total}
              </p>

              <p>
                Future classes: {result.future_classes}
              </p>

              <p>
                Future classes attended:{" "}
                {result.future_attended}
              </p>

              <p>
                Projected: {result.projected_attended} /{" "}
                {result.projected_total}
              </p>

              <p>
                Internal Marks: {result.internal_marks} /{" "}
                {result.max_marks} (
                {result.internal_marks_percentage}%)
              </p>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default WhatIf;