import React, { useState } from "react";
import Sidenav from './Sidenav';
import { Autocomplete, TextField } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";

import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function Client() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'projet', headerName: 'Projet', width: 95 },
  ];

  const initialRows = [
    { id: 1, nom: 'souhila', email: 'souhila@gmail.com', projet: 10 },
    { id: 2, nom: 'hadjer', email: 'souhila@gmail.com', projet: 3 },
    { id: 3, nom: 'dagi', email: 'souhila@gmail.com', projet: 4 },
    { id: 4, nom: 'joujou', email: 'souhila@gmail.com', projet: 20 },
    { id: 5, nom: 'souhila', email: 'souhila@gmail.com', projet: 30 },
    { id: 6, nom: 'souhila', email: 'souhila@gmail.com', projet: 15 },
    { id: 7, nom: 'souhila', email: 'souhila@gmail.com', projet: 16 },
    { id: 8, nom: 'souhila', email: 'souhila@gmail.com', projet: 19 },
    { id: 9, nom: 'souhila', email: 'souhila@gmail.com', projet: 18 },
    { id: 10, nom: 'souhila', email: 'souhila@gmail.com', projet: 17 },
  ];

  const [rows, setRows] = useState(initialRows);

  const [rowData, setRowData] = React.useState({
    id: 0,
    nom: "",
    email: "",
    projet: "",
  });

  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Client");
    setRowData(rowData);
  };

  const filterData = (v: { id: number; nom: string; email: string; projet: number } | null) => {
    if (v && v.nom) {
      const filteredRows = initialRows.filter(row => row.nom.toLowerCase().includes(v.nom.toLowerCase()));
      setRows(filteredRows);
    } else {
      setRows(initialRows);
    }
  };
  
  

  return (
    <>
      <Navdahboard />
      <Sidenav />
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding: '20px', backgroundColor: '#EBEDEF' }}>
        <div style={{ backgroundColor: 'white' }}>
          <h1 style={{ padding: '15px' }}>Clients</h1>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={initialRows}
            getOptionLabel={(row) => row.nom}
            sx={{ width: 300, marginBottom: "15px" }}
            onChange={(e, v) => filterData(v)}
            renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
          />
          <DataTable rows={rows} columns={columns} onRowClick={handleClickGetData} />
        </div>
      </div>
    </>
  );
}
