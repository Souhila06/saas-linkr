import React from "react";
import Sidenav from './Sidenav';
import { Autocomplete, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from "./DataTable";
import Navdahboard from "./Navdahboard";
import AddForm from "./AddFormProjet";
import EditForm from "./EditForm";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

export default function Projet() {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState({
    id: 0,
    titre: "",
    client: "",
    dateDebut: "",
    dateLimite: "",
    progression: "",
  });
  

  const [editopen, setEditOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Titre', width: 130 },
    { field: 'client', headerName: 'Client', width: 130 },
    { field: 'dateDebut', headerName: 'Date de début', width: 150 }, 
    { field: 'dateLimite', headerName: 'Date limite', width: 150 },
    { field: 'progression', headerName: 'Progression', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: () => (
        <>
          <IconButton color="secondary">
          <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
          <IconButton color="primary">
            <EditIcon onClick={handleEditOpen}/>
          </IconButton>
     
        </>
      ),
    },
  ];
  
  const rows = [
    { id: 1, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023', dateLimite: '30-09-2023', progression: 'En cours' },
    { id: 2, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 3, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 4, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 5, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 6, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 7, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 8, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 9, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
    { id: 10, titre: 'Site Web', client: 'Souhila', dateDebut: '30-07-2023',dateLimite:'30-09-2023',progression:'En cour'  },
  ];
  
  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Projet")
    setRowData(rowData)
  }

  return (
    <>
      <Navdahboard/>
      <Sidenav/>  <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding: '20px', backgroundColor: '#EBEDEF' }}>
        <div style={{ backgroundColor: 'white' }}>
          <h1 style={{ padding: '15px' }}>Projets</h1>
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

            <Modal
              open={editopen}
              onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditForm closeEvent={handleEditClose} rowData={rowData}/>
              </Box>
            </Modal>
            
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center', marginBottom: '15px' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              getOptionLabel={(row) => row.titre}
              sx={{ width: 300 }}
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



          <DataTable rows={rows} columns={columns} onRowClick = {handleClickGetData} />


        </div>
      </div>
    
    </>
  );
}
