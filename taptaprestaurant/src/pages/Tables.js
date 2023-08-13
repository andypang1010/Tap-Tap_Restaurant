import { useState } from "react";
import DatabaseContext from "../components/DatabaseContext";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Tables() {
  const [data, setData] = useState({ phone: "none" });

  return (
    <div>
      <h1>{data.phone}</h1>
      <button onClick={() => console.log(data)}>Print Data</button>
      <DatabaseContext onDataChange={setData} />
      <LoginForm />
    </div>
  );
}
