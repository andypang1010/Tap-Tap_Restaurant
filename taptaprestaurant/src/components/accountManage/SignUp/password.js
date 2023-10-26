import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default Main;

function Main() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };



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

            <p style={{
                    marginTop:"40px",
                    color:"black",
                    fontFamily: 'SF Pro',
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
                    <Button  href="/SignUp/password" variant="contained" size="large" style={{ borderRadius: '10px',backgroundColor:"#D41E1E", height:'58px', width: '200px',marginTop:"5px"}}>Next</Button>
        </Box>
        </div>
    )
}
