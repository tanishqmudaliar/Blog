import React from 'react';
import { useUserAuth } from "../Context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider } from '@mui/material';

function Home() {
  const { logOut } = useUserAuth("");
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
  const handlePortfolio = () => {
    navigate("/portfolio");
  }
  const handleBlog = () => {
    navigate("/blog");
  }
  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'background.default',
          color: 'text.secondary',
          display:'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
      <Box
        sx={{
          fontFamily: 'Sofia Sans',
          fontSize: '40px',
          display: 'flexbox',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '33vw',
        }}
        >
          <Box
            sx={{
              mb: 2
            }}
          >
            Create/ Edit a project
          </Box>
          <Button
            onClick={handlePortfolio}
            variant='contained'
            color='warning'
            sx={{
              textTransform: 'none',
              fontFamily: 'Sofia Sans',
              fontSize: '18px',
              width: 'max-content',
            }}
          >
            Portfolio
          </Button>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            fontFamily: 'Sofia Sans',
            fontSize: '40px',
            display: 'flexbox',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '33vw',
          }}
        >
          <Box
            sx={{
              mb: 2
            }}
          >
            Create/ Edit a blog
          </Box>
          <Button
            onClick={handleBlog}
            variant='contained'
            color='warning'
            sx={{
              textTransform: 'none',
              fontFamily: 'Sofia Sans',
              fontSize: '18px',
              width: 'max-content',
            }}
          >
            Blog
          </Button>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            fontFamily: 'Sofia Sans',
            fontSize: '40px',
            display: 'flexbox',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '33vw',
          }}
        >
          <Box
            sx={{
              mb: 2
            }}
          >
            Logout
          </Box>
          <Button
            onClick={handleLogout}
            variant='contained'
            color='warning'
            sx={{
              textTransform: 'none',
              fontFamily: 'Sofia Sans',
              fontSize: '18px',
              width: 'max-content',
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Home