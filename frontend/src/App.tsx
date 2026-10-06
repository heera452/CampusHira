import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Timetable from "./pages/Timetable";
import Notices from "./pages/Notices";
import DigitalTwin from "./pages/DigitalTwin";
import WhatIf from "./pages/WhatIf";
import AIAssistant from "./pages/AIAssistant";

function ProtectedLayout() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Topbar />

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/what-if" element={<WhatIf />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route path="/*" element={<ProtectedLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;