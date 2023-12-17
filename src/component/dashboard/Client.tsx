import React from "react";
import Sidenav from './Sidenav';
import MuiDrawer from '@mui/material/Drawer';
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./DataTable"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';



export default function Client() {


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'projet', headerName: 'Projet', width: 95},
  
  ];
  
  const rows = [
    { id: 1, nom: 'souhila', email: 'souhila@gmail.com', projet: 10 },
    { id: 2, nom: 'souhila', email: 'souhila@gmail.com', projet: 3 },
    { id: 3, nom: 'souhila', email: 'souhila@gmail.com', projet: 4 },
    { id: 4, nom: 'souhila', email: 'souhila@gmail.com', projet: 20 },
    { id: 5, nom: 'souhila', email: 'souhila@gmail.com', projet: 30 },
    { id: 6, nom: 'souhila', email: 'souhila@gmail.com', projet: 15 },
    { id: 7, nom: 'souhila', email: 'souhila@gmail.com', projet: 16 },
    { id: 8, nom: 'souhila', email: 'souhila@gmail.com', projet: 19 },
    { id: 9, nom: 'souhila', email: 'souhila@gmail.com', projet: 18 },
    { id: 10, nom: 'souhila', email: 'souhila@gmail.com', projet: 17 },
  ];
    return (
        <><Navdahboard/>
        <Sidenav/>
        <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding:'20px', backgroundColor: '#EBEDEF' }}>
        <div style={{backgroundColor: 'white'}}>
        <h1 style={{padding:'15px'}}>Clients</h1>
        
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={rows}
        getOptionLabel={(row) => row.nom} 
        sx={{ width: 300, marginBottom:"15px"}}
        renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
        />
        <DataTable rows={rows} columns={columns} />

       
        </div>
        </div>
        
      </>
          
       
    )
}