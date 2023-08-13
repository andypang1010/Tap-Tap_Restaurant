import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

export default function DatabaseContext({ onDataChange }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    const newSocket = io("http://localhost:8008");
    setSocket(newSocket);

    return () => {
      // Clean up the socket connection when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("data", (newData) => {
        onDataChange(newData);
      });
    }
  }, [socket, onDataChange]);

  useEffect(() => {
    axios
      .get("http://localhost:8008/protected")
      .then((response) => {
        console.log(response);
        console.log("User is logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <></>;
}