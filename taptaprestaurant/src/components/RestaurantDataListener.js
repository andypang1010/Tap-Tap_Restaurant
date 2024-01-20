import { useEffect } from "react";
import axios from "axios";

export default function RestaurantDataListener({
  onDataChange,
  authenticationFailureRedirect = "",
  socket,
}) {
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
        //navigate(authenticationFailureRedirect);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("data", (newData) => {
        onDataChange(newData);
      });
    }
  }, [socket, onDataChange]);

  return <></>;
}
