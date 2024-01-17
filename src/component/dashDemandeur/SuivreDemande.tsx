import React, { useState } from 'react';
import Navdashboard from "../dashboard/Navdahboard";
import SidDemandeur from "./SidDemandeur";
import jsPDF from 'jspdf';
import '../../style/DateTableDemande.css'
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Paper, Step, StepContent, StepLabel, createTheme, Stepper, ThemeProvider, Typography } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import logo from '../logo.png';


const theme = createTheme({
    palette: {
        primary: {
            main: '#3B556D', // Définir la couleur principale ici
        },
    },
});
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

interface SuivreDemandeProps {
    demande: {
        id: number;
        titre: string;
        nomoffreur: string;
        cahierDeCharge?: string;
        description: string;
        dateenvoie: string;
    }[];
}
const SuivreDemande: React.FC<SuivreDemandeProps> = ({
    demande
}) => {
    const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };
    
    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
    };
    
    const getDueDate = () => {
        const currentDate = new Date();
        const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
        return dueDate.toISOString().split('T')[0];
    };
    const generateInvoice = () => {
        const pdf = new jsPDF();
      
        pdf.setFontSize(25);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Facture', 95, 25);
    
        pdf.addImage(logo, 'PNG', 90, 30, 40, 40); 
      
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        
        // Utilisation de valeurs par défaut
        const currentDate = getCurrentDate();
        const dueDate = getDueDate();
        const clientName = "souhila";
        const clientAddress = "souhila";
        const clientPhone = "souhila";
    
        pdf.text(`Date: ${currentDate}`, 150, 70);
        pdf.text(`Due Date: ${dueDate}`, 150, 80);
    
        pdf.text('Bill To:', 10, 90);
        pdf.text(`Nom client: ${clientName}`, 10, 100);
        pdf.text(`Adresse: ${clientAddress}`, 10, 110);
        pdf.text(`Tel: ${clientPhone}`, 10, 120);
    
        let yOffset1 = 140;
    
        pdf.setFontSize(14);
        pdf.text('Description', 10, yOffset1);
        pdf.text('Unité', 80, yOffset1);
        pdf.text('Prix', 160, yOffset1);
    
        let totalAmount = 0;
        let yOffset = 150;
        const lineHeight = 3;
        const price = 50; // Exemple de prix par défaut
        pdf.line(10, yOffset1 + lineHeight, 190, yOffset1 + lineHeight);
        const items = [
            { description: 'Item 1', unite: 1, prix: price },
            // Ajoutez d'autres articles si nécessaire
        ];
    
        pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);
        
        items.forEach(item => {
            const itemTotal = item.unite * Number(item.prix);
            totalAmount += itemTotal;
    
            pdf.text(item.description, 10, yOffset);
            pdf.text(item.unite.toString(), 80, yOffset);
            pdf.text(`$${itemTotal.toFixed(2)}`, 160, yOffset);
            pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);
    
            yOffset += 10;
        });
    
        pdf.setFontSize(12);
        pdf.text('Total Amount:', 120, yOffset + 10);
        pdf.text(`$${totalAmount.toFixed(2)}`, 160, yOffset + 10);
        pdf.line(120, yOffset + 13, 190, yOffset + 13);
    
        pdf.save('invoice.pdf');
    };
    const [selectedDemande, setSelectedDemande] = useState<{
        id: number;
        titre: string;
        nomoffreur: string;
        cahierDeCharge?: string;
        description?: string;
        dateenvoie?: string;
    }>()
  
      console.log(selectedDemande?.description);
      const generatePDF = () => {
        if (selectedDemande) {
            const pdf = new jsPDF();

            pdf.text(`Cahier de charge : ${selectedDemande.cahierDeCharge}`, 10, 40);



            pdf.save('demande_info.pdf');
        }
    };
      
    
      
    return (
        <> <Navdashboard />
            <SidDemandeur />
            <Box
                sx={{
                    position: 'relative',
                    left: '240px',
                    width: 'calc(100% - 240px)',
                    top: '70px',
                }}
            >


                <div>
                    
                    <h1 style={{ padding: '20px' }}>Suivre demande</h1>
                    <div style={{ display: 'flex'  }}>  <ThemeProvider theme={theme}>
                    <div style={{width: '60%', padding: '40px'}}>
                    <Typography variant="body1" gutterBottom>
                                    <strong>ID:</strong> {selectedDemande?.id}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Titre:</strong> {selectedDemande?.titre}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Nom Offreur:</strong> {selectedDemande?.nomoffreur}
                                </Typography>

                                <>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Cahier de charge:</strong>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={generatePDF}
                                            style={{ marginTop: '10px', backgroundColor: '#3B556D', color: 'white' }}
                                        >
                                            PDF
                                        </Button>
                                    </Typography>

                                    <Typography variant="body1" gutterBottom>
                                        <strong>Description:</strong> {selectedDemande?.description}
                                    </Typography>

                                    <Typography variant="body1" gutterBottom>
                                        <strong>Date Envoie:</strong> {selectedDemande?.dateenvoie}
                                    </Typography>

                                </>


                        </div >
                       

                        <Box sx={{ width:'40%', padding: '20px' }}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel

                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>

                                            <Box sx={{ mb: 2 }}>
                                                {/* <div>

                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                    </Button>
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={handleBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div> */}
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} sx={{ p: 3 }}>
                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                    {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                        Reset
                                    </Button> */}
                                </Paper>
                            )}
                        </Box>
                    </ThemeProvider>
                       
                        </div>

                </div>
                <div className='div-demande'>
                    <div className='div-rdv'>
                        <h1>Rendez-vous</h1>
                        <div>
                            <span>Date :  24/08/1992</span>
                            <span>Heure : 14:60</span>
                            <span>Endroit/lien : Paris</span>
                        </div>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>
                    </div>
                </div>
                <hr className='hr-1' />
                <div className='div-facture'>
                    <h1>Facture</h1>
                    <div>
                        <div>
                            <span>Télécharger la facture</span>
                            <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={generateInvoice}
                                        style={{ marginTop: '10px', backgroundColor: '#3B556D', color: 'white' }}
                                    >
                                        PDF
                                    </Button>
                        </div>
                        <a href="">Payer</a>
                    </div>
                </div>
                <hr className='hr-1' />
                <div className='div-refus'>
                    <h1>Motif refus</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam excepturi quas, quis repellat est facilis nihil a maxime qui nostrum sequi temporibus illo hic asperiores quaerat harum eaque unde totam?</p>
                </div>

                                

            </Box>

        </>
    );
};

export default SuivreDemande;
