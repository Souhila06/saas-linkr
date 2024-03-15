import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '../style/NavBar.css';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useLogoutMutation } from '../services/authApi';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import { Avatar, Divider, ListItemIcon, Tooltip } from '@mui/material';
import logo from './logo.png';

const pages = ['Acceuil', 'Nos Service', 'A propos', 'Notre Communauté', 'Avis Clients'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const [open, setOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await logout({});
     

      if ('data' in result) {
        console.log('Déconnexion réussie');
        localStorage.removeItem('accessToken');
        navigate('/login');
        setAccessToken(null);
        handleCloseMenu();
      } else {
        console.error('La déconnexion a échoué:', result.error);
        
      }
    } catch (error) {
    
      console.error('Error during logout:', error);
    }
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
 
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);

     
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
      }
    }
  }, []);

  
  return (
    <AppBar position="static" sx={{ display: 'flex', alignItems: 'center', background: '#3B556D' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters  >
        <img
  src={logo}
  alt="Votre photo"
  style={{
    display: 'flex',
    marginRight: '1px',
    width: '100px',
    height: 'auto',
  }}
/>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
        
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>





            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className='div-sign'>
            {accessToken ? (
              // Si accessToken est présent, affiche le bouton de déconnexion
              <>
                <span>{username}</span>
                <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickMenu}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openMenu ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
            {username ? username[0].toUpperCase() : ''}
          </Avatar>
          </IconButton>
        </Tooltip>
                <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem  onClick={handleLogout}>
          <ListItemIcon   >
            <Logout fontSize="small" />
          </ListItemIcon >
          Logout
        </MenuItem>
      </Menu>
               

              </>

            ) : (
              // Sinon, affiche les boutons de connexion et d'inscription
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    backgroundColor: '#3B556D',
                    color: '#5FC2BA',
                    padding: '10px 20px',
                    fontWeight: '500',
                    border: 'solid white 1px',
                    '&:hover': {
                      backgroundColor: '#5FC2BA',
                      color: 'white',
                      border: 'solid #3B556D 1px',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    backgroundColor: '#5FC2BA',
                    color: 'white',
                    padding: '10px 20px',
                    marginLeft: '20px',
                    fontWeight: '500',
                    border: 'solid #5FC2BA 1px',
                    '&:hover': {
                      backgroundColor: '#3B556D',
                      color: '#5FC2BA',
                    },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

        </Toolbar>

      </Container>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={(props) => (
            <div className='dialog-signup'>
              <h2> Sign Up</h2>
              <div className='dialog-signup-item'>
                <div>
                  <img src="/image/offr.jpg" width={"120px"} alt="" />
                  <h3>demandeurs</h3>
                  <p>Lorem eprehenderit untae autem! Tenetur, dolorem.</p>
                  <Link className='abutton1' to="/signup/demandeur" onClick={handleClose}>Commencer</Link>
                </div>

                <div>
                  <img src="/image/deman.jpg" width={"120px"} alt="" />
                  <h3>offreurs</h3>
                  <p>Lorem ipsum doloexercittae autem! Tenetur, dolorem.</p>
                  <Link className='abutton2' to="/signup/offreur" onClick={handleClose}>Commencer</Link>
                </div>
              </div>
            </div>
          )}
        >

        </Dialog>
      </Dialog>
    </AppBar>
  );
}
export default NavBar;