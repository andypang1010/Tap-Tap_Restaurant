import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Info from "./pages/Info";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import LoginScreen from "./components/accountManage/LoginScreen/main.js";
import SignUpEmail from "./components/accountManage/SignUp/email.js";
import SignUpPassword from "./components/accountManage/SignUp/password";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  document.title = "Tap Tap Restaurant";
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Tables />} />

            {/* Jeffery: I put the pages in another dir :)*/}
            <Route path="/loginScreen" element={<LoginScreen />} />
            <Route path="/SignUp/email" element={<SignUpEmail />} />
            <Route path="/SignUp/password" element={<SignUpPassword />} />

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Info />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
