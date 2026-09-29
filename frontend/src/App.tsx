import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        <Sidebar />

        <div className="ml-64">

          <Topbar />

          <main className="p-8">

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;