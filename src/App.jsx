import { Routes, Route } from "react-router-dom";
import Landing1 from "./pages/Landing1.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing1 />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
