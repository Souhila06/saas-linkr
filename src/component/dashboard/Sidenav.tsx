import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/dashboard") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/dashboard") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/evenement") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/evenement") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Évènement " sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/client") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/client") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/projet") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/projet") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Projets" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/tache") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/tache") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tâches" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/message") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/message") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/equipe") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/equipe") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <PeopleIcon /> 
              </ListItemIcon>
              <ListItemText primary="Équipes" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/compte") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/compte") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <AccountBoxIcon /> {/* Ajoutez ici l'icône que vous souhaitez */}
              </ListItemIcon>
              <ListItemText primary="Mon Compte" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>


        <List sx={{ padding: 0, backgroundColor: location.pathname.includes("/offreur/demande") ? "#E0F4FF" : "white" }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/offreur/demande") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#3B556D', 
                }}
              >
                <MailIcon /> {/* Remplacez par l'icône que vous souhaitez utiliser */}
              </ListItemIcon>
              <ListItemText primary="Demande Client" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

      </Drawer>

    </Box>
  );
}