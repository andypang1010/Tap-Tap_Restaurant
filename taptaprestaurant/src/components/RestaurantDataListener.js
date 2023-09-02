import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

export default function DatabaseContext({
  onDataChange,
  authorizationFailureRedirect = "",
}) {
  const socket = io("http://localhost:8008");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    axios
      .get("http://localhost:8008/protected")
      .then((response) => {
        console.log(response);
        console.log("User is logged in!");
      })
      .catch((error) => {
        navigate(authorizationFailureRedirect);
      });

    return () => {
      // Clean up the socket connection when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authorizationFailureRedirect, navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("data", (newData) => {
        onDataChange(newData);
      });
    }
  }, [socket, onDataChange]);

  return <></>;
}
