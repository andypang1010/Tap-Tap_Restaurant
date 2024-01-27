import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";
import Tables from "./pages/Tables/Tables.js";
import OrderHistory from "./pages/OrderHistory/OrderHistory.js";
import Menu from "./pages/Menu/Menu.js";
import Account from "./pages/Account/Account.js";
import ResetPassword from "./pages/ResetPassword/ResetPassword.js";
import Users from "./pages/Users/Users.js";
import EditUser from "./pages/EditUser/EditUser.js";
import NewUser from "./pages/NewUser/NewUser.js";
import Settings from "./pages/Settings/Settings.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import io from "socket.io-client";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {
  NotificationProvider,
  useNotification,
} from "./components/NotificationContext.js";
import NotificationsBar from "./components/NotificationsBar/NotificationsBar.js";

export const AuthContext = createContext();
export const SocketContext = createContext();

export default function App({ socket = io("http://localhost:8008") }) {
  return (
    <Router>
      <Contain socket={socket} />
    </Router>
  );
}

function RestaurantName({ name }) {
  return <span className="restaurant-name-badge">{name}</span>;
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
      <AuthContext.Provider value={{ authenticated, user }}>
        <SocketContext.Provider value={{ socket, data }}>
          <NotificationProvider>
            <NotificationsBar />
            {authenticated && (
              <>
                <SideBar />
                <RestaurantName name={data?.username} />
              </>
            )}
            <Routes>
              {authenticated ? (
                <>
                  <Route path="/" element={<Tables />} />
                  <Route path="/Tables" element={<Tables />} />
                  <Route path="/Menu" element={<Menu />} />
                  <Route path="/Account" element={<Account />} />
                  <Route
                    path="/Account/ResetPassword"
                    element={<ResetPassword />}
                  />
                  <Route path="/OrderHistory" element={<OrderHistory />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/Users/NewUser" element={<NewUser />} />
                  <Route path="/Users/EditUser" element={<EditUser />} />
                  <Route path="/Settings" element={<Settings />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Register" element={<SignUp />} />
                </>
              )}
            </Routes>
          </NotificationProvider>
        </SocketContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
