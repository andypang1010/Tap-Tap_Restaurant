import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";
import Account from "./pages/Account/Account.js";
import Menu from "./pages/Menu/Menu.js";
import Tables from "./pages/Tables/Tables.js";
import Users from "./pages/Users/Users.js";
import NewUser from "./pages/NewUser/NewUser.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import OrderHistory from "./pages/OrderHistory/OrderHistory.js";
import io from "socket.io-client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function authenticate() {
  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get("http://localhost:8008/protected")
    .then((response) => {
      console.log("User is logged in!");
      return true;
    })
    .catch((error) => {
      //navigate("/Login");
      return false;
    });

  return false;
}

function App({ socket = io("http://localhost:8008") }) {
  const [data, setData] = useState(null);
  const authenticated = useMemo(() => {
    return authenticate();
  }, []);

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

  document.title = "Tap Tap Restaurant";
  return (
    <>
      <Router>
        <div className="contain">
          <SideBar />
          <Routes>
            <Route path="/" element={<Tables socket={socket} data={data} />} />
            <Route
              path="/Tables"
              element={<Tables socket={socket} data={data} />}
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<SignUp />} />
            <Route
              path="/Menu"
              element={<Menu socket={socket} data={data} />}
            />
            <Route
              path="/Account"
              element={<Account socket={socket} data={data} />}
            />
            <Route
              path="/OrderHistory"
              element={<OrderHistory socket={socket} data={data} />}
            />
            <Route
              path="/Users"
              element={<Users socket={socket} data={data} />}
            />
            <Route path="/NewUser" element={<NewUser data={data} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
