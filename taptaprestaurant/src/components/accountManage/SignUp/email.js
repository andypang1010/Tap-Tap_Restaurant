import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default App;

function App() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [mainAddress, setMainAddress] = useState("");

    const registerGeneralInfo ={firstName,lastName,email,phoneNumber,restaurantName,mainAddress}


    return (
        <div className="signUpEmail-container"
         style={{display: 'flex',
                alignItems: 'center',      // Vertically center
                height: '100vh',            // This assumes you want to center in the entire viewport height
                flexDirection: 'column'}}
        >
            <p
                href="#" // replace with your desired link
                style={{
                    color:"black",
                    marginTop:"18px",
                    fontFamily: 'SF Pro',
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '28.64px',
                    letterSpacing: '-1%',
                    textAlign: 'center',
                    display: 'block'
                }}
            >
                Create your account
            </p>

            <div style={{gap:"8px",marginTop:"25px"}}>
                <p style={{
                    color:"black",
                    fontFamily: 'SF Pro',
                    fontWeight: 700,
                    fontSize: '36px',
                    lineHeight: '42.96px',
                    letterSpacing: '-1%',
                    textAlign: 'center',
                    display: 'block'
                }}>Let's get started</p>

                 <p style={{
                    color:"black",
                    marginTop:"15px",
                    fontFamily: 'SF Pro',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '19.09px',
                    letterSpacing: '-1%',
                    textAlign: 'center',
                    display: 'block'
                }}>Already have an account? Log in
                </p>
            </div>

            <div
                style={{marginTop:"21px", width:"992px", height:"561px", gap:"8px", alignItems: 'center',  justifyContent: 'center',}}>
                <Box sx={{
                    justifyContent: 'center',
                    marginTop: "50px",
                    height:"87px",
                }}>
                    <TextField style={{width:"486px"}} color="error" id="outlined-basic" label="First name*" variant="outlined"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                    <TextField style={{width:"486px", marginLeft:"20px"}} color="error" id="outlined-basic" label="Last name*" variant="outlined"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </Box>

                <Box style={{width:"100vx", marginTop:"20px"}}>
                    <TextField style={{width:"992px", height:"87px"}} color="error" id="outlined-basic" label="Email*" variant="outlined"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Box>

                <Box style={{width:"100vx",marginTop:"20px"}}>
                    <TextField style={{width:"992px", height:"87px"}} color="error" id="outlined-basic" label="Phone number*" variant="outlined"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </Box>

                <Box style={{width:"100vx",marginTop:"20px"}}>
                    <TextField style={{width:"992px", height:"87px"}} color="error" id="outlined-basic" label="Restaurant name*" variant="outlined"
                        onChange={(e) => {
                            setRestaurantName(e.target.value);
                        }}
                    />
                </Box>

                <Box style={{width:"100vx",marginTop:"20px"}}>
                    <TextField style={{width:"992px", height:"87px"}}  color="error" id="outlined-basic" label="Main address" variant="outlined"
                        onChange={(e) => {
                            setMainAddress(e.target.value);
                        }}
                    />
                </Box>

                <Box style={{width:"100vx",marginTop:"20px"}}>
                    <Button  onClick={()=>{
                        localStorage.setItem('registerGeneralInfo', JSON.stringify(registerGeneralInfo));
                        console.log(registerGeneralInfo)
                        navigate('/SignUp/password');
                        }}  variant="contained" size="large" style={{ borderRadius: '10px',backgroundColor:"#D41E1E", height:'58px', width: '200px',marginTop:"5px",marginLeft:"396px"}}>Next</Button>
                </Box>
            </div>


        </div>
    )

}




