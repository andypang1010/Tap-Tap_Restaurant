import { useState } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Tables() {
  const [data, setData] = useState(null);

  return (
    <div>
      {/*RestaurantDataListener usage demo. MUST BE LOGGED IN IN ORDER TO RETRIEVE DATA*/}
      <h1>{data != null ? data.phone : ""}</h1>
      <button onClick={() => console.log(data)}>Print Data</button>
      <RestaurantDataListener onDataChange={setData} />
      <LoginForm />
    </div>
  );
}
