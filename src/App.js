import React, { useContext, createContext, useMemo, useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import ErrorPage from './Components/ErrorPage';
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Breadcrumbs, Link, SpeedDial, Tooltip } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ProtectedRoute from './Components/ProtectedRoute';
import Portfolio from './Components/Portfolio';
import Blog from './Components/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <ProtectedRoute Component={Home}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/portfolio',
    element: <ProtectedRoute Component={Portfolio}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/blog',
    element: <ProtectedRoute Component={Blog}/>,
    errorElement: <ErrorPage />,
  },
]);

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <div className='App'>
      <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
        <SpeedDial
          color='warning'
          ariaLabel='SpeedDial basic example'
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={theme.palette.mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          onClick={colorMode.toggleColorMode}
          FabProps={{
            sx: {
              bgcolor: 'icon.speeddial',
              '&:hover': {
                bgcolor: 'icon.speeddial',
              }
            }
          }}
        >
        </SpeedDial>
      </Tooltip>
      <AppBar
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '5vh',
        }}
      >
        <Breadcrumbs>
          <Link
            underline='none'
            href='/blog'
            sx={{
              color: 'text.secondary',
            }}
          >
            Blog
          </Link>
          <Link
            underline='none'
            href='/portfolio'
            sx={{
              color: 'text.secondary',
            }}
          >
            Portfolio
          </Link>
          <Link
            underline='none'
            href='/home'
            sx={{
              color: 'text.secondary',
            }}
          >
            Home
          </Link>
        </Breadcrumbs>
      </AppBar>
      <RouterProvider router={router} />
    </div>
  );
}

export default function AppWithDarkMode() {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            ...(mode === 'dark'
              ? {
                default: '#131313',
                footer: '#202020',
              } : {
                default: '#edf1fd',
                footer: '#eaeaea'
              }
            )
          },
          text: {
            ...(mode === 'dark'
              ? {
                primary: '#ffb300',
                secondary: 'rgba(255, 255, 255, 0.7)',
                hover: '#ffb300',
                footer: 'rgba(255, 255, 255, 0.7)'
              } : {
                primary: '#000000',
                secondary: '#303030',
                hover: '#000000',
                footer: '#909090'
              }
            )
          },
          icon: {
            ...(mode === 'dark'
              ? {
                background: 'rgba(255, 255, 255, 0.7)',
                color: '#303030',
                speeddial: '#ffa726',
              } : {
                background: '#303030',
                color: '#ffb300',
                speeddial: '#ed6c02',
              }
            )
          },
        },
      }),
    [mode],
  );  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}