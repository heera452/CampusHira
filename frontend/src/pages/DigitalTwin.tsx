import { useEffect, useState } from "react";

type TwinData = {
  student: {
    name: string;
    register_number: string;
    semester: number;
  };
  attendance: {
    subject: string;
    percentage: number;
  }[];
  marks: {
    subject: string;
    exam_type: string;
    percentage: number;
  }[];
  timetable: {
    subject: string;
    day: string;
    start_time: string;
    end_time: string;
    room: string;
  }[];
};

function DigitalTwin() {
  const [data, setData] = useState<TwinData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch("http://127.0.0.1:8000/api/v1/digital-twin/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  if (!data) {
    return <p>Loading Digital Twin...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Student Digital Twin
      </h1>

      <p className="mt-2 text-slate-500">
        AI-powered academic profile of {data.student.name}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Student</h2>
          <p className="mt-3">{data.student.name}</p>
          <p>{data.student.register_number}</p>
          <p>Semester {data.student.semester}</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Attendance</h2>

          {data.attendance.map((item, index) => (
            <div key={index} className="mt-3">
              <p>{item.subject}</p>
              <p className="text-2xl font-bold">{item.percentage}%</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Marks</h2>

          {data.marks.map((item, index) => (
            <div key={index} className="mt-3">
              <p>{item.subject}</p>
              <p>{item.exam_type}</p>
              <p className="text-2xl font-bold">{item.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Timetable</h2>

        {data.timetable.map((item, index) => (
          <div
            key={index}
            className="mt-4 rounded-lg bg-slate-50 p-4"
          >
            <p className="font-semibold">{item.subject}</p>
            <p>{item.day}</p>
            <p>
              {item.start_time} - {item.end_time}
            </p>
            <p>{item.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DigitalTwin;