import React, { useState } from "react";
import Sidenav from './Sidenav';
import MuiDrawer from '@mui/material/Drawer';
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddForm from "./AddFormTache";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Tache() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = React.useState({
    id: 0,
    titre: "",
    client: "",
    dateDebut: "",
    dateLimite: "",
    progression: "",
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Titre', width: 130 },
    { field: 'dateDebut', headerName: 'Date de début', width: 150 },
    { field: 'dateLimite', headerName: 'Date limite', width: 110 },
    { field: 'projet', headerName: 'Projet', width: 95 },
    { field: 'afecter', headerName: 'Affecté a', width: 110 },
    { field: 'collaborateur', headerName: 'Collaborateur', width: 150 },
    { field: 'statu', headerName: 'Statue', width: 100 },
  ];

  const initialRows = [
    { id: 1, titre: 'Etude projet', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 2, titre: 'front end ', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 3, titre: 'back end ', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 4, titre: 'Etude projet', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 5, titre: 'Etude projet', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 6, titre: 'Etude projet', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
    { id: 7, titre: 'Etude projet', dateDebut: '16-07-2023', dateLimite: '20-09-2023', projet: 24, afecter: 'souhila', collaborateur: 'hadjer', statu: 'Faite' },
  ];

  const [rows, setRows] = useState(initialRows);

  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Tache")
    setRowData(rowData)
  }

  const filterData = (v: { id: number; titre: string; dateDebut: string; dateLimite: string; projet: number; afecter: string; collaborateur: string; statu: string } | null) => {
    if (v && v.titre) {
      const filteredRows = initialRows.filter(row => row.titre.toLowerCase().includes(v.titre.toLowerCase()));
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
          <h1 style={{ padding: '15px' }}>Taches</h1>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <AddForm closeEvent={handleClose} />
              </Box>
            </Modal>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              getOptionLabel={(row) => row.titre}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
            />
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
              sx={{
                marginLeft: '10px',
                backgroundColor: 'black',
                color: 'white',
                padding: '10px',
                '&:active': {
                  backgroundColor: 'black',
                },
                '&:focus': {
                  backgroundColor: 'black',
                },
              }}
            >
              Ajouter
            </Button>
          </div>
          <DataTable rows={rows} columns={columns} onRowClick={handleClickGetData} />
        </div>
      </div>
    </>
  )
}
