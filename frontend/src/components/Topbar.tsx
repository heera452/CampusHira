import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Student Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back to CampusHira
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none"
          />
        </div>

        <button className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            H
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Heera
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;