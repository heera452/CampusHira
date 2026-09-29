import {
  CalendarCheck,
  GraduationCap,
  AlertTriangle,
  Briefcase,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Good morning, Heera 👋
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here is your academic overview for today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Attendance
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                87%
              </h2>

              <p className="mt-2 text-xs text-green-600">
                Above required percentage
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <CalendarCheck size={22} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                CGPA
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                8.42
              </h2>

              <p className="mt-2 text-xs text-green-600">
                Current semester
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <GraduationCap size={22} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Academic Risk
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Low
              </h2>

              <p className="mt-2 text-xs text-green-600">
                No immediate concern
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <AlertTriangle size={22} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Placement Readiness
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                72%
              </h2>

              <p className="mt-2 text-xs text-blue-600">
                Improving
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Briefcase size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* Main section */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="text-lg font-semibold text-slate-900">
            Today's Classes
          </h2>

          <p className="text-sm text-slate-500">
            Your upcoming classes
          </p>

          <div className="mt-5 space-y-3">

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">
                  Machine Learning
                </p>

                <p className="text-sm text-slate-500">
                  Room 302 · Dr. Priya
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600">
                09:00 AM
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">
                  Computer Networks
                </p>

                <p className="text-sm text-slate-500">
                  Lab 2 · Prof. Arun
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600">
                11:00 AM
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">
                  Deep Learning
                </p>

                <p className="text-sm text-slate-500">
                  Room 204 · Dr. Meena
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600">
                02:00 PM
              </span>
            </div>

          </div>

        </div>

        {/* AI card */}
        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

          <div className="text-2xl">
            ✨
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            AI Recommendation
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Your attendance in Computer Networks is slightly lower
            than your other subjects. Consider attending the next
            few sessions regularly.
          </p>

          <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900">
            Ask AI Assistant
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;