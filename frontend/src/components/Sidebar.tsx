import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  CalendarDays,
  Bell,
  Bot,
  Brain,
  Calculator,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
          C
        </div>

        <div>
          <h1 className="font-bold text-slate-900">
            CampusHira
          </h1>

          <p className="text-xs text-slate-500">
            Intelligent Campus
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 p-3">

        {/* Dashboard */}
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        {/* Attendance */}
        <button
          onClick={() => window.location.href = "/attendance"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <CalendarCheck size={19} />
          Attendance
        </button>

        {/* Marks */}
        <button
          onClick={() => window.location.href = "/marks"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <GraduationCap size={19} />
          Marks
        </button>

        {/* Timetable */}
        <button
          onClick={() => window.location.href = "/timetable"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <CalendarDays size={19} />
          Timetable
        </button>

        {/* Notices */}
        <button
          onClick={() => window.location.href = "/notices"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Bell size={19} />
          Notices
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => window.location.href = "/ai-assistant"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Bot size={19} />
          AI Assistant
        </button>

        {/* Digital Twin */}
        <button
          onClick={() => window.location.href = "/digital-twin"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Brain size={19} />
          Digital Twin
        </button>

        {/* What-If Simulator */}
        <button
          onClick={() => window.location.href = "/what-if"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Calculator size={19} />
          What-If Simulator
        </button>

      </nav>

      {/* Bottom menu */}
      <div className="space-y-1 border-t border-slate-200 p-3">

        {/* Profile */}
        <button
          onClick={() => window.location.href = "/profile"}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <User size={19} />
          Profile
        </button>

        {/* Settings */}
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Settings size={19} />
          Settings
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;