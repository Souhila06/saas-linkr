import React, { useState } from "react";
import Sidenav from './Sidenav';
import MuiDrawer from '@mui/material/Drawer';
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddForm from "./AddFormEquipe";
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

export default function Equipe() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = React.useState({
    id: 0,
    nom: "",
    titre: "",
    email: "",
    telephone: "",
  });

  const columns: GridColDef[] = [
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'titre', headerName: 'Titre du poste', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'telephone',
      headerName: 'Téléphone',
      type: 'number',
      width: 105,
    },
  ];

  const initialRows = [
    { id: 1, nom: 'souhila', titre: 'Développeur', email: 'souhila@gmail.com', telephone: '0772851706' },
    { id: 2, nom: 'dagi', titre: 'Développeur', email: 'souhila@gmail.com', telephone: '0772851706' },
    { id: 3, nom: 'hadjer', titre: 'Développeur', email: 'souhila@gmail.com', telephone: '0772851706' },
    { id: 4, nom: 'sila', titre: 'Développeur', email: 'souhila@gmail.com', telephone: '0772851706' },
    { id: 5, nom: 'souhila', titre: 'Développeur', email: 'souhila@gmail.com', telephone: '0772851706' },
  ];

  const [rows, setRows] = useState(initialRows);

  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Equipe")
    setRowData(rowData)
  }

  const filterData = (v: { nom: string; titre: string; email: string; telephone: string } | null) => {
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
          <h1 style={{ padding: '15px' }}>Equipes</h1>
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
              getOptionLabel={(row) => row.nom}
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
