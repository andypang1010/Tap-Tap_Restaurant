import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Account from "./pages/Account";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Users from "./pages/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import OrderHistory from "./pages/Account";
import io from "socket.io-client";

function App() {
  const socket = io("http://localhost:8008");

  document.title = "Tap Tap Restaurant";
  return (
    <>
      <Router>
        <div className="contain">
          <SideBar />
          <Routes>
            <Route socket={socket} path="/" element={<Tables />} />
            <Route socket={socket} path="/Tables" element={<Tables />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<SignUp />} />
            <Route socket={socket} path="/Menu" element={<Menu />} />
            <Route socket={socket} path="/Account" element={<Account />} />
            <Route
              socket={socket}
              path="/OrderHistory"
              element={<OrderHistory />}
            />
            <Route socket={socket} path="/Users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
