import React, { useState,useEffect } from "react";
import Sidenav from './Sidenav';
import { Autocomplete, TextField } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListDemandeursQuery } from "../../services/authApi";

export default function Client() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fname', headerName: 'Name', width: 130 },
    { field: 'lname', headerName: 'Prenom', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
  

  ];

  const initialRows = [
    { id: 1, fname: '', lname:'', email: ''},
  ];

  const [rows, setRows] = useState(initialRows);

  const [rowData, setRowData] = React.useState({
    id: 0,
    fname: "",
    email: "",

  });

  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Client");
    setRowData(rowData);
  };

  // const filterData = (v: { id: number; nom: string; email: string; projet: number } | null) => {
  //   if (v && v.nom) {
  //     const filteredRows = initialRows.filter(row => row.nom.toLowerCase().includes(v.nom.toLowerCase()));
  //     setRows(filteredRows);
  //   } else {
  //     setRows(initialRows)
  //   }
  // };
  
  const { data: listDemandeurs, error: listDemandeursError } = useListDemandeursQuery({});
  useEffect(() => {

    if (listDemandeurs) {
      console.log('Liste des Demandeurs:', listDemandeurs);
        setRows(listDemandeurs)
     
    } else if (listDemandeursError) {
      console.error('Erreur lors de la récupération de la liste des demandeurs:', listDemandeursError);
    }
  }, [listDemandeurs, listDemandeursError]);
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
            sx={{ width: 300, marginBottom: "15px" }}
          
            renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
          />
          <DataTable rows={rows} columns={columns} onRowClick={handleClickGetData} />
        </div>
      </div>
    </>
  );
}
