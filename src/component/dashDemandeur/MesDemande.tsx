import React, { useState ,useEffect} from 'react';
import SidDemandeur from './SidDemandeur';
import MuiDrawer from '@mui/material/Drawer';
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import Navdashboard from "../dashboard/Navdahboard";
import DateTabledemande from "./DateTabledemande";
import DemandeClient from "../dashboard/DemandeClient";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import { useListDemandeDemandeurQuery } from '../../services/authApi';


export default function MesDemande() {
  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Titre', width: 130 },
    { field: 'projet', headerName: 'Projet', width: 95 },
    { field: 'nomoffreur', headerName: 'Nom Offreur', width: 200 },
    { field: 'cahierDeCharge', headerName: 'cahierDeCharge', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'dateenvoie', headerName: 'Date Envoie', width: 200 },



  ];
 
  // const rows = [
  //   { id: 1, titre: 'site web',  nomoffreur: 'souhila', cahierDeCharge: 'C:/Users/Souhila/Downloads/mon_cahier_de_charges.pdf',description:'je veux un site un ecommerce' ,dateenvoie:'12/07/2001'},
  //   { id: 2, titre: 'site web',  nomoffreur: 'souhila', cahierDeCharge: 'C:/Users/Souhila/Downloads/mon_cahier_de_charges.pdf',description:'je veux un site un ecommerce' ,dateenvoie:'12/07/2001'},
  //   { id: 3, titre: 'site web',  nomoffreur: 'souhila', cahierDeCharge: 'C:/Users/Souhila/Downloads/mon_cahier_de_charges.pdf',description:'je veux un site un ecommerce' ,dateenvoie:'12/07/2001'},
  //   { id: 4, titre: 'site web',  nomoffreur: 'souhila', cahierDeCharge: 'C:/Users/Souhila/Downloads/mon_cahier_de_charges.pdf',description:'je veux un site un ecommerce' ,dateenvoie:'12/07/2001'},

 
  // ];
  

  const [rowData, setRowData] = React.useState({
    id: 0,
    titre: "",
    nomoffreur: "",
    cahierDeCharge:"",
    description:"",
    dateenvoie:"",

  });
  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Projet")
    setRowData(rowData)
  }
  const [selectedDemande, setSelectedDemande] = useState<{
    id: number;
    titre: string;
    nomoffreur: string;
    cahierDeCharge?: string;
    description?: string;
    dateenvoie?: string;
}>(/* valeur initiale ici */);
  const generatePDF = () => {
    if (selectedDemande) {
        const pdf = new jsPDF();

        pdf.text(`Cahier de charge : ${selectedDemande.cahierDeCharge}`, 10, 40);



        pdf.save('demande_info.pdf');
    }
};

const storedUserString = localStorage.getItem('user');
let id: string = ""; 

if (storedUserString) {
  const storedUser = JSON.parse(storedUserString);
  id = storedUser.demandeur.id; 
}

const { data: listDemandeDemandeur, error: listDemandeDemandeurError } = useListDemandeDemandeurQuery(id);

useEffect(() => {
  if (listDemandeDemandeur) {
    console.log('Liste des Demandes du Demandeur:', listDemandeDemandeur);
    setRows(listDemandeDemandeur);
  } else if (listDemandeDemandeurError) {
    console.error('Erreur lors de la récupération de la liste des demandes du demandeur:', listDemandeDemandeurError);
  }
}, [listDemandeDemandeur, listDemandeDemandeurError]);

function convertDate(myDate: string): string {
   
  var date = new Date(myDate.toString());

  var jour = date.getDate(); 
  var mois = (date.getMonth() + 1).toString().padStart(2, '0');
  var annee = date.getFullYear();
  const newDateEmission = jour + "/" + mois + "/" + annee ;
  return newDateEmission;
}



  return (
    <><Navdashboard />
      <SidDemandeur />
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding: '20px', backgroundColor: '#EBEDEF' }}>
        <div style={{ backgroundColor: 'white' }}>
          <h1 style={{ padding: '15px' }}>Mes Demandes</h1>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            getOptionLabel={(row) => row.titre}
            sx={{ width: 300, marginBottom: "15px" }}
            renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
          />
          {/* <DateTabledemande rows={rows} columns={columns} /> */}
         {/* <DemandeClient rows={rows} columns={columns} /> */}

         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Nom offreur</th>
                        <th>Description</th>
                        <th>Date Envoie</th>
                        <th>Cahier de charge</th>

                    </tr>
                </thead>
                <tbody>
                    {rows.map((columns) => (
                        <React.Fragment key={columns.id}>
                            <tr className='table-text' style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{columns.id}</td>
                                <td>{columns.title}</td>
                                <td>{columns.offreur.fname}</td>
                                
                                <td>{columns.description}</td>
                                <td>{convertDate(columns.date_emission)}</td>
                                <Typography variant="body1" gutterBottom>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={generatePDF}
                                        style={{ marginTop: '10px',margin:'20px', backgroundColor: '#3B556D', color: 'white' }}
                                    >
                                        PDF
                                    </Button>
                                </Typography>


                                <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/demande/${columns.id}`}>
                                        <Button 
                                             style={{
                                                padding: '2px px',
                                                margin: '0 5px',
                                                background: '#3B556D',
                                                color: 'white',
                                                fontWeight: 400,
                                                borderRadius: '5px',
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                            }}
                                        >
                                         Suivre demande
                                        </Button>
                                    </Link>
                                 
                                </td>
                            </tr>

                        
                        </React.Fragment>
                    ))}
                </tbody>
                
            </table>
       
        </div>
      </div>

    </>


  )
}