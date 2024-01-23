import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";
import Account from "./pages/Account/Account.js";
import Menu from "./pages/Menu/Menu.js";
import Tables from "./pages/Tables/Tables.js";
import Users from "./pages/Users/Users.js";
import NewUser from "./pages/NewUser/NewUser.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import OrderHistory from "./pages/OrderHistory/OrderHistory.js";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import ResetPassword from "./pages/ResetPassword/ResetPassword.js";
import Settings from "./pages/Settings/Settings.js";

export default function App({ socket = io("http://localhost:8008") }) {
  return (
    <Router>
      <Contain socket={socket} />
    </Router>
  );
}

function Contain({ socket }) {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on("data", (newData) => {
        setData(newData);
      });
    }

    return () => {
      // Clean up the socket connection when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    axios
      .get("http://localhost:8008/protected")
      .then(() => {
        console.log("User is logged in!");
        setAuthenticated(true);
        axios
          .get("http://localhost:8008/user/getUserAccount")
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log("GET USER: ", error);
          });
      })
      .catch((error) => {
        navigate("/Login");
        setAuthenticated(false);
      });
  }, [navigate]);

  return (
    <div className="contain">
      <div className="contain">
        {authenticated && <SideBar />}
        <Routes>
          {authenticated ? (
            <>
              <Route
                path="/"
                element={<Tables socket={socket} data={data} />}
              />
              <Route
                path="/Tables"
                element={<Tables socket={socket} data={data} />}
              />
              <Route
                path="/Menu"
                element={<Menu socket={socket} data={data} />}
              />
              <Route
                path="/Account"
                element={<Account socket={socket} data={data} user={user} />}
              />
              <Route
                path="/Account/ResetPassword"
                element={<ResetPassword user={user} />}
              />
              <Route
                path="/OrderHistory"
                element={<OrderHistory socket={socket} data={data} />}
              />
              <Route
                path="/Users"
                element={<Users socket={socket} data={data} user={user} />}
              />
              <Route path="/Users/NewUser" element={<NewUser data={data} />} />
              <Route
                path="/Settings"
                element={<Settings socket={socket} data={data} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<SignUp />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
