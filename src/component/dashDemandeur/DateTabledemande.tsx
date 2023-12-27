import React, { useState } from 'react';
// import Navdashboard from "../dashboard/Navdashboard";
// import SidDemandeur from "./SidDemandeur";
// import Listdeman from "./Listdeman";
import { display, height } from '@mui/system';
import '../../style/DateTableDemande.css'
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3B556D', // Définir la couleur principale ici
        },
    },
});

interface DateTabledemandeProps {
    columns: GridColDef[];

    rows: {
        id: number;
        titre: string;
        nomoffreur: string;
        cahierDeCharge?: string;
        description: string;
        dateenvoie: string;
    }[];
}

const steps = [
    {
        label: 'Envoyée',

    },
    {
        label: 'En cours de traitement',

    },
    {
        label: 'Acceptée/En attente de paiament',

    },
    {
        label: 'Confirmée',

    },
];

const DateTabledemande: React.FC<DateTabledemandeProps> = ({ columns, rows }) => {
    const generatePDF = () => {
        if (selectedDemande) {
            const pdf = new jsPDF();

            pdf.text(`Cahier de charge : ${selectedDemande.cahierDeCharge}`, 10, 40);



            pdf.save('demande_info.pdf');
        }
    };

    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const [selectedDemande, setSelectedDemande] = useState<{
        id: number;
        titre: string;
        nomoffreur: string;
        cahierDeCharge?: string;
        description?: string;
        dateenvoie?: string;
    }>(/* valeur initiale ici */);


    const handleAfficherClick = (demande: {
        id: number;
        titre: string;
        nomoffreur: string;
        cahierDeCharge?: string;
        description?: string;
        dateenvoie?: string;
    }) => {
        setSelectedDemande(demande);
        setOpenModal(true);
    };
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [openSuivreModal, setOpenSuivreModal] = useState(false);

    const handleSuivreClick = () => {
        setOpenModal(false);
        setOpenSuivreModal(true);
    };
    const handleSuivreClose = () => {
        setOpenSuivreModal(false);
    };
   
    console.log(selectedDemande?.description);
  

    return (
        <>
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
                                <td>{columns.titre}</td>
                                <td>{columns.nomoffreur}</td>
                                
                                <td>{columns.description}</td>
                                <td>{columns.dateenvoie}</td>
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
                                    <Link to='/nouvelle-page'>
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
       
         
        </>
    );
};

export default DateTabledemande;
