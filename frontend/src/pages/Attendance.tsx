import { useEffect, useState } from "react";

type AttendanceRecord = {
  id: number;
  subject_id: number;
  subject_name: string;
  total_classes: number;
  attended_classes: number;
  percentage: number;
};

function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/attendance/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attendance");
        }

        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load attendance.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading attendance...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Attendance
      </h1>

      <p className="mt-2 text-slate-500">
        Your attendance details
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {attendance.map((record) => (
          <div
            key={record.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
           <h2 className="text-lg font-semibold text-slate-800">
  {record.subject_name}
</h2>

            <p className="mt-4 text-slate-600">
              Attended: {record.attended_classes} /{" "}
              {record.total_classes}
            </p>

            <p className="mt-3 text-3xl font-bold text-blue-600">
              {record.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;