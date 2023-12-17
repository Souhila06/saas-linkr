import * as React from 'react';
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




const pages = ['Acceuil', 'Nos Service', 'A propos','Notre Communauté','Avis Clients'];
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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
<AppBar position="static" sx={{ display: 'flex', alignItems: 'center' ,background:'#3B556D' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters  >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            LOGO
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
  <Link className='abutton1' to="/signup/demandeur"  onClick={handleClose}>Commencer</Link>
</div>

<div>
  <img src="/image/deman.jpg" width={"120px"} alt="" />
  <h3>offreurs</h3>
  <p>Lorem ipsum doloexercittae autem! Tenetur, dolorem.</p>
  <Link className='abutton2' to="/signup/offreur"  onClick={handleClose}>Commencer</Link>
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