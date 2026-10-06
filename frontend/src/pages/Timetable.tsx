import { useEffect, useState } from "react";

type TimetableRecord = {
  id: number;
  subject_id: number;
  subject_name: string;
  day: string;
  start_time: string;
  end_time: string;
  room: string;
};

function Timetable() {
  const [timetable, setTimetable] = useState<TimetableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/timetable/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }

        return response.json();
      })
      .then((data) => {
        setTimetable(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load timetable.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading timetable...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Timetable
      </h1>

      <p className="mt-2 text-slate-500">
        Your class schedule
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {timetable.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-800">
              {item.subject_name}
            </h2>

            <p className="mt-3 text-slate-600">
              Day: {item.day}
            </p>

            <p className="mt-2 text-slate-600">
              Time: {item.start_time} - {item.end_time}
            </p>

            <p className="mt-2 text-slate-600">
              Room: {item.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;