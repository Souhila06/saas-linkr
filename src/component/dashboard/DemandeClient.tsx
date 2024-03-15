import React, { useEffect, useState } from "react";
import Sidenav from './Sidenav';
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DateTabledemande from "../dashDemandeur/DateTabledemande";
import jsPDF from 'jspdf';
import pdfUrl from './cahier.pdf'
import { Link } from 'react-router-dom';
import { useListDemandeQuery } from "../../services/authApi";


export default function Client() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titre', width: 130 },
    { field: 'cahierDeCharge', headerName: 'cahier De Charge', width: 200 },
    { field: 'description', headerName: 'Description', width: 95 },
    { field: 'dateenvoie', headerName: 'Date Envoie', width: 95 },
    { field: 'client', headerName: 'Client', width: 95 },
    { field: 'action', headerName: 'Action', width: 95 },

  ];

  const initialRows = [
    { id: 1, title: '', cc: '', description: '', date_emission: '', demandeur: {fname: ""} },



  ];

  const [rows, setRows] = useState(initialRows);

  const [rowData, setRowData] = React.useState({
    id: 0,
    titre: "",
    cahierDeCharge: "",
    description: "",
    dateenvoie: "",
    client: ""
  });
  

  const handleClickGetData = (rowData: any) => {
    console.log(rowData, "Client");
    setRowData(rowData);
  };

  // const filterData = (v: { id: number; nom: string; email: string; projet: number } | null) => {
  //   if (v && v.nom) {
  //     const filteredRows = initialRows.filter(row => row.titre.toLowerCase().includes(v.nom.toLowerCase()));
  //     setRows(filteredRows);
  //   } else {
  //     setRows(initialRows);
  //   }
  // };
  const [selectedDemande, setSelectedDemande] = useState<{
    id: number;
    titre: string;
    cahierDeCharge?: string;
    description?: string;
    dateenvoie?: string;
    client?: string;
  }>(/* valeur initiale ici */);
  const generatePDF = (selectedData: {
    id: number;
    titre: string;
    fname:string;
    cahierDeCharge: string;
    description: string;
    dateenvoie: string;
    client: string;
  }) => {
    window.open(pdfUrl, '_blank');
  };

  const storedUserString = localStorage.getItem('user');
let id: string = ""; 

if (storedUserString) {
  const storedUser = JSON.parse(storedUserString);
  id = storedUser.offreur.id; 
}

let { data: listDemande, error: listDemandesError } = useListDemandeQuery(id)


  useEffect(() => {
    if (listDemande) {
      console.log('Liste des Demandes:', listDemande);
    
      setRows(listDemande);
      
    } else if (listDemandesError) {
      console.error('Erreur lors de la récupération de la liste des demandes:', listDemandesError);
    }
  }, [listDemande, listDemandesError]);

  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    const fname = storedUser.demandeur.fname;
  }
  function convertDate(myDate: string): string {
   
    var date = new Date(myDate.toString());

    var jour = date.getDate(); 
    var mois = (date.getMonth() + 1).toString().padStart(2, '0');
    var annee = date.getFullYear();
    const newDateEmission = jour + "/" + mois + "/" + annee ;
    return newDateEmission;
}

 
  return (
    <>
      <Navdahboard />
      <Sidenav />
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding: '20px', backgroundColor: '#EBEDEF' }}>
        <div style={{ backgroundColor: 'white' }}>
          <h1 style={{ padding: '15px' }}>Demande Clients</h1>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={initialRows}
            getOptionLabel={(row) => row.title}
            sx={{ width: 300, marginBottom: "15px" }}
            // onChange={(e, v) => filterData(v)}
            renderInput={(params) => <TextField {...params} size="small" label="Recherche " />}
          />
          {/* <DataTable rows={rows} columns={columns} onRowClick={handleClickGetData} /> */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Cahier de charge</th>
                <th>Description</th>
                <th>Client</th>
                <th>Date Envoie</th>
               

              </tr>
            </thead>
            <tbody>
              {rows.map((columns) => (
                <React.Fragment key={columns.id}>
                  <tr className='table-text' style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{columns.id}</td>
                    <td>{columns.title}</td>
                   
                    <td>{columns.cc}</td>
                    <td>{columns.description}</td>
                    <td>{columns.demandeur.fname}</td>
                    
                    <td>{convertDate(columns.date_emission)}</td>



                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Link to={`/nouvelle/${columns.id}/${columns.title}/${columns.demandeur.fname}/${columns.date_emission}/${columns.description}/${columns.cc}`}>
                        <Button
                          style={{
                            padding: '1px 1px',
                            margin: '0 5px',
                            background: '#3B556D',
                            color: 'white',
                            fontWeight: 400,
                            borderRadius: '5px',
                            textDecoration: 'none',
                            display: 'inline-block',
                          }}

                        >
                          Afficher
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
  );
}
