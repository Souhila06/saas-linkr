import React, { useState } from "react";
import Sidenav from './Sidenav';
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import DataTable from "./Datatable";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DateTabledemande from "../dashDemandeur/DateTabledemande";
import jsPDF from 'jspdf';
import pdfUrl from './cahier.pdf'
import { Link } from 'react-router-dom';


export default function Client() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Titre', width: 130 },
    { field: 'cahierDeCharge', headerName: 'cahier De Charge', width: 200 },
    { field: 'description', headerName: 'Description', width: 95 },
    { field: 'dateenvoie', headerName: 'Date Envoie', width: 95 },
    { field: 'client', headerName: 'Client', width: 95 },
    { field: 'action', headerName: 'Action', width: 95 },

  ];

  const initialRows = [
    { id: 1, titre: 'site web', cahierDeCharge: 'cahier.pdf', description: 'site web ecommerce', dateenvoie: '12 Octobre 2001', client: 'mayes' },
    { id: 2, titre: 'apk', cahierDeCharge: 'cahier.pdf', description: 'application mobile', dateenvoie: '12 Octobre 2001', client: 'hadjer' },
    { id: 3, titre: 'logiciel', cahierDeCharge: 'cahier.pdf', description: 'Logiciel', dateenvoie: '12 Octobre 2001', client: 'dagi' },
    { id: 4, titre: 'site', cahierDeCharge: 'cahier.pdf', description: 'site', dateenvoie: '12 Octobre 2001', client: 'sssss' },
    { id: 5, titre: 'maquette', cahierDeCharge: 'cahier.pdf', description: 'maquette', dateenvoie: '12 juillet 2001', client: 'yyyyy' },



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

  const filterData = (v: { id: number; nom: string; email: string; projet: number } | null) => {
    if (v && v.nom) {
      const filteredRows = initialRows.filter(row => row.titre.toLowerCase().includes(v.nom.toLowerCase()));
      setRows(filteredRows);
    } else {
      setRows(initialRows);
    }
  };
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
    cahierDeCharge: string;
    description: string;
    dateenvoie: string;
    client: string;
  }) => {
    window.open(pdfUrl, '_blank');
  };

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
            getOptionLabel={(row) => row.titre}
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
                <th>Date Envoie</th>
                <th>Client</th>

              </tr>
            </thead>
            <tbody>
              {rows.map((columns) => (
                <React.Fragment key={columns.id}>
                  <tr className='table-text' style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{columns.id}</td>
                    <td>{columns.titre}</td>
                    <Typography variant="body1" gutterBottom>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => generatePDF(columns)}
                        style={{
                          display: 'inline-block',
                          marginTop: '10px',
                          margin: '20px',
                          backgroundColor: '#3B556D',
                          color: 'white'
                        }}
                      >
                        PDF
                      </Button>
                    </Typography>
                    <td>{columns.description}</td>
                    <td>{columns.dateenvoie}</td>
                    <td>{columns.client}</td>



                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Link to={`/nouvelle/${columns.id}/${columns.titre}/${columns.client}/${columns.dateenvoie}/${columns.description}/${columns.cahierDeCharge}`}>
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
