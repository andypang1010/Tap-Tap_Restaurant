import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default Main;

const serverUrl="https://taptap-414502.uw.r.appspot.com/auth/register"; //Jeffery: it's better to module this!


    /* -------------------------------------------------- */
    /* |  Jeffery: this cryptography strategy stupid    |*/
    /* |  We may want to remove this line later         |*/
    /* ------------------------------------------------- */

    //Jeffery: this is stolen from https://github.com/andypang1010/TapTapAPI/blob/main/server/scripts/registerRestaurant_auth.js#L14C1-L492C1
    const data = {
      name: "Makoto Sushi",//dummy-data -> not useful
      username: "makoto",
      password: "",
      address: `3-4 Surugadai Kanda, Chiyoda city, Tokyo\nShin Ochanomizu building B1\nPostal Code 101- 0062`,
      phone: "03-3295-8537",
      language: "EN",
      currency: "JPY",
      description: "TODO",
      menu: [
        {
          name: "Miyabi",
          price: 8000,
          description: `All course menu. Includes a draft beer or soft drink. Course menu content is seasonal.`,
          ingredients: ["to", "do"],
          type: "Course",
          category: "Course",
          vegetarian: false,
          allergies: ["Fish", "Eggs", "Shellfish"],
          available: true,
        },
        {
          name: "Makoto",
          price: 11000,
          description: `All course menu. Includes a draft beer or soft drink. Course menu content is seasonal.`,
          ingredients: ["to", "do"],
          type: "Course",
          category: "Course",
          vegetarian: false,
          allergies: ["Fish", "Eggs", "Shellfish"],
          available: true,
        },
      ],
      maxQuantity: 5,
      maxTable: 7,
      tables: {},
    };
    /* -------------------------------------------------- */
    /* |  Jeffery: end                                  |*/
    /* |                                                |*/
    /* ------------------------------------------------- */

function Main() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [password,setPassword] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState(""); //TODO: perform sanity check
    const navigate = useNavigate();
    const registerGeneralInfo = JSON.parse(localStorage.getItem('registerGeneralInfo'));
    console.log(registerGeneralInfo)

    return(
        <div className="signUpEmail-container"
        style={{display: 'flex',
               alignItems: 'center',      // Vertically center
               height: '100vh',            // This assumes you want to center in the entire viewport height
               flexDirection: 'column'}}
       >
            <p
                style={{
                    color:"black",
                    marginTop:"18px",
                    fontFamily: "'SF Pro Display', sans-serif",
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

            <p style={{
                    marginTop:"40px",
                    color:"black",
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '36px',
                    lineHeight: '42.96px',
                    letterSpacing: '-1%',
                    textAlign: 'center',
                    display: 'block'
                }}>Keep your account safe</p>



        <FormControl variant="outlined" style={{marginTop:"30px"}}>
          <InputLabel htmlFor="outlined-adornment-password"color="error">Create a password</InputLabel>
          <OutlinedInput
            style={{width:"992px", height:"67px"}}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            color="error"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Create a password"
          />
          <FormHelperText id="outlined-weight-helper-text">Must be at least 8 characters long.</FormHelperText>
        </FormControl>

        <FormControl variant="outlined" style={{marginTop:"30px"}}>
          <InputLabel htmlFor="outlined-adornment-password"color="error">Confirm password</InputLabel>
          <OutlinedInput
            style={{width:"992px", height:"67px"}}
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
            color="error"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
          <FormHelperText id="outlined-weight-helper-text">Please confirm your password</FormHelperText>
        </FormControl>

        <Box style={{width:"100vx",marginTop:"120px"}}>
                    <Button onClick={async()=>{
                      data.name = registerGeneralInfo.restaurantName
                      data.username = registerGeneralInfo.email
                      data.phone = registerGeneralInfo.phoneNumber
                      data.address = registerGeneralInfo.mainAddress
                      data.password = password

                      axios.post(serverUrl,{data:data}).then((res)=>{
                        console.log(res)
                        navigate('/LoginScreen');
                      }).catch((err)=>{
                          console.log(err)
                        }
                      )
                    }}
                     variant="contained" size="large" style={{ borderRadius: '10px',backgroundColor:"#D41E1E", height:'58px', width: '200px',marginTop:"5px"}}>Next</Button>
        </Box>
        </div>
    )
}
