import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUserAuth } from "../Context/UserAuthContext.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState();
    const [open, setOpen] = useState(false);
    const { logIn, user } = useUserAuth();
    const [values, setValues] = useState({
      showPassword: false,
    });
  
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await logIn(email, password);
        setStatus(true);
        setOpen(true);
        await delay(1000);
        navigate("/home");
      } catch (err) {
        setStatus(false);
        setError(err.message);
        setOpen(true);
      }
    };  

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        };
    
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    })
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    width: '100vw',
                    height: '100vh',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'background.default',
                }}
            >
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={status === false ? "error" : "success"} sx={{ width: '100%' }}>
                        {status === true ? "Successfully logged in!" : error}
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        backgroundColor: 'background.footer',
                        boxShadow: '0px 1px 15px #808080',
                        width: '40vw',
                        height: '50vh',
                        borderRadius: '10px',
                        fontFamily: 'Sofia Sans',
                        fontSize: '40px',
                        display: 'grid',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    Welcome
                    <TextField
                        required
                        type='email'
                        color='warning'
                        label='Email'
                        variant='filled'
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            width: '30vw',
                            color: '#ffb300',
                            input: {
                                color: 'text.secondary',
                                fontFamily: 'Sofia Sans',
                                fontSize: '15px',
                            }
                        }}
                    />
                    <TextField
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        color='warning'
                        label="Password"
                        variant="filled"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            width: '30vw',
                            color: '#ffb300',
                            input: {
                                color: 'text.secondary',
                                fontFamily: 'Sofia Sans',
                                fontSize: '15px',
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant='contained'
                        color='warning'
                        type='submit'
                        sx={{
                            textTransform: 'none',
                            fontFamily: 'Sofia Sans',
                            fontSize: '15px',
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
            </form>
        </div>
    )
}

export default Login