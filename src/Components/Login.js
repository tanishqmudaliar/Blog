import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUserAuth } from "../Context/UserAuthContext.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth("");
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await logIn(email, password);
        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    };  

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