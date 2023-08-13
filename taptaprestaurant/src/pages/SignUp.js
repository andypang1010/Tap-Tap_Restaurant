//import axios from "axios";

function SignUp() {
  return (
    <>
      <br />
      <div className="container">
        <h1>Sign Up</h1>
      </div>
    </>
  );
}

/*function registerRestaurant() {
  axios
    .post("http://localhost:8008/auth/register", {
      timestamp: Date.now(),
      // authCode: encrypted,
      // data: data
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}*/

export default SignUp;

/* 
    name: string,
    username: string,
    password: string,
    loc: string,
    size: number,
    description: string,
    menu: Object[],
    phone: string,
    maxTable: number,
    tables: Object,
*/
