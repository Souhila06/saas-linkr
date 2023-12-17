import React from "react";
import Sidenav from './Sidenav';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import List from "./List";

export default function Compte() {
    return (
        <>
            <Navdahboard />
            <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding:'20px' }}>
              <List></List>
           </div>
            <Sidenav />
        </>
    );
}
