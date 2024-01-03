import React, { ChangeEvent, useState } from 'react';
import Navdashboard from "../dashboard/Navdahboard";
import Sidenav from "./Sidenav";
import { Checkbox, FormControlLabel, Grid, IconButton, MenuItem, Modal, TextField } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import jsPDF from 'jspdf';
import { Box, Typography, Button, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddForm from './AddFormProjet';
import CloseIcon from '@mui/icons-material/Close';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import fleur from './fleur.png';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

interface DetailOffreurProps {
    closeEvent: () => void;
}

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

const DetailOffreur: React.FC<DetailOffreurProps> = ({ closeEvent }) => {

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const { id, titre, client, dateenvoie, description, cahierDeCharge } = useParams();
    console.log("ID:", id);
    console.log("Titre:", titre);
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
    const [selectedDemande, setSelectedDemande] = useState<{
        id: number;
        titre: string;
        cahierDeCharge?: string;
        description?: string;
        dateenvoie?: string;
        client?: string;
    }>()
    const [open, setOpen] = React.useState(false);
    const [isLieuEnabled, setIsLieuEnabled] = useState(false);
    const [isLienEnabled, setIsLienEnabled] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset the selected date and time when closing the modal
        setSelectedDate('');
        setSelectedTime('');
    };

    const [openGenerateFacture, setOpenGenerateFacture] = useState(false);
    const [idDemande, setIdDemande] = useState('');
    const [clientName, setClientName] = useState('');
    const [priceDemand, setPriceDemand] = useState('');


    const handleOpenGenerateFacture = () => setOpenGenerateFacture(true);
    const handleCloseGenerateFacture = () => {
        setOpenGenerateFacture(false);
        setIdDemande('');
        setClientName('');
        setPriceDemand('');
    };

    const [refusModalOpen, setRefusModalOpen] = useState(false);
    const [refusalReason, setRefusalReason] = useState('');

    const handleCloseRefusModal = () => {
        setRefusModalOpen(false);
        setRefusalReason(''); // Clear the refusal reason when the modal is closed
    };

    const handleOpenRefusModal = () => {
        setRefusModalOpen(true);
    };

    const handleRefusalReasonChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setRefusalReason(event.target.value);
    };
    console.log(selectedDemande?.description);
    const generatePDF = () => {
        if (selectedDemande) {
            const pdf = new jsPDF();

            pdf.text(`Cahier de charge : ${cahierDeCharge}`, 10, 40);



            pdf.save('demande_info.pdf');
        }
    };

    const handleCloseDialog = () => {


        closeEvent();

    };
   

    const handleCheckboxChangeLieu = (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const { name } = event.target;

        if (name === 'lieu') {
            setIsLieuEnabled(checked);
            setIsLienEnabled(!checked); // 
        }
    };

    const handleCheckboxChangeLien = (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const { name } = event.target;

        if (name === 'lien') {
            setIsLienEnabled(checked);
            setIsLieuEnabled(!checked); // Deactivate "lieu" when "lien" is selected
        }
    };

    const generateInvoice = () => {
        const pdf = new jsPDF();
    
      
        pdf.setFontSize(25);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Facture', 95, 25);

        pdf.addImage(fleur, 'PNG', 90, 30, 40, 40); 
    
     
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');

        
        pdf.text(`Date: ${getCurrentDate()}`, 150, 70);
        pdf.text(`Due Date: ${getDueDate()}`, 150, 80);
    
 
        pdf.text('Bill To:', 10, 90);
        pdf.text(`Nom client: ${clientName}`, 10, 100);
        pdf.text(`Adresse: ${clientName}`, 10, 110);
        pdf.text(`Tel: ${clientName}`, 10, 120);

        
        let yOffset1 = 140;

        pdf.setFontSize(14);
        pdf.text('Description', 10, yOffset1);
        pdf.text('Unité', 80, yOffset1);
        pdf.text('Prix', 160, yOffset1);
    
        let totalAmount = 0;
        let yOffset = 150;
        const lineHeight = 3;
        const price: string | number = priceDemand; // Ensure priceDemand is assigned a value
        pdf.line(10, yOffset1 + lineHeight, 190, yOffset1 + lineHeight);
        const items = [
            { description: 'Item 1', unite: 1, prix: price || 0 },
           
        ];
        
        pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);
        
        items.forEach(item => {
          
            const itemTotal = item.unite * Number(item.prix);
            totalAmount += itemTotal;
        
            pdf.text(item.description, 10, yOffset);
            pdf.text(item.unite.toString(), 80, yOffset);
            // pdf.text(`$${item.prix.toFixed(2)}`, 120, yOffset); 
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
    

    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
    };
    
  
    const getDueDate = () => {
        const currentDate = new Date();
        const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
        return dueDate.toISOString().split('T')[0];
    };
    
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    };

    return (
        <>

            <Navdashboard />
            <Sidenav />

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
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '60%', padding: '40px' }}>
                            <Typography variant="body1" gutterBottom>
                                <strong>ID:</strong> {id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Titre:</strong> {titre !== undefined ? titre : 'Default Title'}
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
                                    <strong>Description:</strong> {description}
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    <strong>Date Envoie:</strong> {dateenvoie}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Client:</strong> {client}
                                </Typography>

                            </>


                        </div >


                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>

                            <Button
                                style={{
                                    padding: '15px 20px',
                                    margin: '0 5px',
                                    background: '#3B556D',
                                    color: 'white',
                                    fontWeight: 400,
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                }}
                                onClick={handleOpen}
                            >
                                Planifier RDV
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"

                            >

                                <Box
                                    sx={style}
                                >
                                    <Typography variant="h5" align="center">
                                        Planifier RDV
                                    </Typography>
                                    <IconButton
                                        style={{ position: 'absolute', top: '0', right: '0' }}
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Grid container spacing={2}>


                                        <Grid item xs={12}>
                                            <TextField
                                                id="date-rdv"
                                                type="date"
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    minWidth: '100%',
                                                    '& .MuiInputLabel-root': {
                                                        color: '#3B556D',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D !important', // Utilisation de !important pour forcer la priorité
                                                    },
                                                    '& .Mui-focused .MuiInputLabel-root': {
                                                        color: '#3B556D !important', // Utilisation de !important pour forcer la priorité
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="time-rdv"
                                                type="time"
                                                variant="outlined"
                                                size="small"
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                                sx={{
                                                    minWidth: '100%',
                                                    '& .MuiInputLabel-root': {
                                                        color: '#3B556D',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D !important', // Utilisation de !important pour forcer la priorité
                                                    },
                                                    '& .Mui-focused .MuiInputLabel-root': {
                                                        color: '#3B556D !important',
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox name="lieu" checked={isLieuEnabled} onChange={handleCheckboxChangeLieu}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#3B556D',
                                                        },
                                                        '&.Mui-checked': {
                                                            color: '#3B556D',
                                                        },
                                                    }}
                                                />
                                                }
                                                label="Lieu"
                                            />
                                            {isLieuEnabled && (
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Lieu"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        minWidth: '100%',
                                                        '& .MuiInputLabel-root': {
                                                            color: '#3B556D',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D',
                                                        },
                                                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D', // Couleur de bordure lorsqu'il est en surbrillance
                                                        },
                                                        '& .Mui-focused .MuiInputLabel-root': {
                                                            color: '#3B556D', // Couleur de l'étiquette lorsqu'il est en surbrillance
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox name="lien" checked={isLienEnabled} onChange={handleCheckboxChangeLien}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#3B556D',
                                                        },
                                                        '&.Mui-checked': {
                                                            color: '#3B556D',
                                                        },
                                                    }}
                                                />
                                                }
                                                label="Lien"
                                            />
                                            {isLienEnabled && (
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Lien"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        minWidth: '100%',
                                                        '& .MuiInputLabel-root': {
                                                            color: '#3B556D',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D',
                                                        },
                                                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3B556D',
                                                        },
                                                        '& .Mui-focused .MuiInputLabel-root': {
                                                            color: '#3B556D',
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="h5" align="center">
                                                <Button variant="contained" style={{ backgroundColor: '#3B556D', color: 'white' }} onClick={() => { }}>
                                                    Envoyer
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                            <Button
                                style={{
                                    padding: '15px 20px',
                                    margin: '0 5px',
                                    background: '#3B556D',
                                    color: 'white',
                                    fontWeight: 400,
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                }}
                                onClick={handleOpenGenerateFacture}
                            >
                                Génerer Facture
                            </Button>
                            <Modal open={openGenerateFacture}
                                onClose={handleCloseGenerateFacture}>
                                <Box
                                    sx={{
                                        position: 'absolute' as 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                    }}
                                >
                                    <Typography variant="h5" align="center">
                                        Générer Facture
                                    </Typography>
                                    <IconButton
                                        style={{ position: 'absolute', top: '0', right: '0' }}
                                        onClick={handleCloseGenerateFacture}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="ID Demande"
                                                variant="outlined"
                                                fullWidth
                                                type='Number'
                                                value={idDemande}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setIdDemande(e.target.value)
                                                }
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        color: '#3B556D',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Nom du Client"
                                                variant="outlined"
                                                fullWidth
                                                value={clientName}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setClientName(e.target.value)
                                                }
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        color: '#3B556D',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Prix Demandé"
                                                variant="outlined"
                                                fullWidth
                                                type='Number'
                                                value={priceDemand}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    setPriceDemand(e.target.value)
                                                }
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        color: '#3B556D',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3B556D',
                                                    },
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                style={{ backgroundColor: '#3B556D', color: 'white' }}
                                                variant="contained"
                                                onClick={generateInvoice}
                                            >
                                                Générer Facture
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>

                            <Button
                                style={{
                                    padding: '15px 20px',
                                    margin: '0 5px',
                                    background: '#3B556D',
                                    color: 'white',
                                    fontWeight: 400,
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                }}

                                onClick={handleOpenRefusModal}
                            >
                                Refuser
                            </Button>
                            <Modal open={refusModalOpen} onClose={handleCloseRefusModal}>
                                <Grid container spacing={2} sx={{
                                    position: 'absolute' as 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Typography variant="h5" align="center">
                                        Motif de Refus
                                    </Typography>
                                    <IconButton
                                        style={{ position: 'absolute', top: '0', right: '0' }}
                                        onClick={handleCloseRefusModal}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Motif de Refus"
                                            multiline
                                            rows={4}
                                            value={refusalReason}
                                            onChange={handleRefusalReasonChange}
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: '#3B556D',
                                                },

                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3B556D',
                                                },

                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3B556D',
                                                },
                                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3B556D',
                                                },

                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" style={{ backgroundColor: '#3B556D', color: 'white' }}>
                                            Envoyer
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Modal>



                        </div>


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
                            <a href="">PDF</a>
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

export default DetailOffreur;