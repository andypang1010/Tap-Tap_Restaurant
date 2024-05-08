import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Register/Register.jsx";
import Tables from "./pages/Tables/Tables.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Account from "./pages/Account/Account.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import Users from "./pages/Users/Users.jsx";
import EditUser from "./pages/EditUser/EditUser.jsx";
import NewUser from "./pages/NewUser/NewUser.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { NotificationProvider } from "./components/NotificationContext.jsx";
import NotificationsBar from "./components/NotificationsBar/NotificationsBar.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import environment from "./environment.json";

export const AuthContext = createContext();
export const SocketContext = createContext();

const queryClient = new QueryClient({});

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Contain />
      </QueryClientProvider>
    </Router>
  );
}

function RestaurantName({ name }) {
  return <span className="restaurant-name-badge">{name}</span>;
}

function Contain() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [restaurantName, setRestaurantName] = useState(localStorage.getItem("restaurant"));
  const navigate = useNavigate();

  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    console.log(urlParts);
  }, [])

  useEffect(() => {
    if (!authenticated) {
      const jwt = localStorage.getItem("jwt");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      axios
        .get(`${environment.API_BASEURL}/protected`)
        .then((response) => {
          console.log("User is logged in!");
          setData(response.data);
          console.log(response.data);
          setAuthenticated(true);
          axios
            .get(`${environment.API_BASEURL}/user/getUserAccount`)
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.log("GET USER: ", error);
            });
        })
        .catch(() => {
          navigate("/Login");
          setAuthenticated(false);
        });
    }
  }, [navigate, authenticated]);

  return (
    <div className="contain">
      <AuthContext.Provider value={{ authenticated, setAuthenticated, user, restaurantName, setRestaurantName }}>
        <SocketContext.Provider value={{ data }}>
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
                  <Route path=":restaurantName" >
                    <Route path="*" element={<Navigate to="Tables" replace />} />
                    <Route path="Tables" element={<Tables />} />
                    <Route path="Menu" element={<Menu />} />
                    <Route path="Account" element={<Account />} />
                    <Route
                      path="Account/ResetPassword"
                      element={<ResetPassword />}
                    />
                    <Route path="OrderHistory" element={<OrderHistory />} />
                    <Route path="Users" element={<Users />} />
                    <Route path="Users/NewUser" element={<NewUser />} />
                    <Route path="Users/EditUser" element={<EditUser />} />
                    <Route path="Settings" element={<Settings />} />
                  </Route>
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
