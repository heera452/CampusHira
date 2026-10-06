import { useEffect, useState } from "react";

type StudentProfile = {
  id: number;
  register_number: string;
  name: string;
  email: string;
  semester: number;
  department_id: number;
};

function Profile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/v1/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load student profile.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        My Profile
      </h1>

      <p className="mt-2 text-slate-500">
        Student profile information
      </p>

      {profile && (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Student Details
          </h2>

          <div className="mt-6 space-y-4">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {profile.name}
            </p>

            <p>
              <span className="font-medium">Register Number:</span>{" "}
              {profile.register_number}
            </p>

            <p>
              <span className="font-medium">Email:</span>{" "}
              {profile.email}
            </p>

            <p>
              <span className="font-medium">Semester:</span>{" "}
              {profile.semester}
            </p>

            <p>
              <span className="font-medium">Department ID:</span>{" "}
              {profile.department_id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;