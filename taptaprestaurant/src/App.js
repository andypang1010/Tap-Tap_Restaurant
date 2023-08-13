import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Info from "./pages/Info";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardNav from "./components/DashboardNav/DashboardNav";

function App() {
  document.title = "Tap Tap Restaurant";
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Info />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;