import React, { useState, useEffect } from "react";
import Navdashboard from "../dashboard/Navdahboard";
import SidDemandeur from "./SidDemandeur";
import jsPDF from "jspdf";
import "../../style/DateTableDemande.css";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  createTheme,
  Stepper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import logo from "../logo.png";
import {
  useCreateCheckoutSessionMutationMutation,
  useShowDemandeDemandeurQueryQuery,
  useShowDemandeQueryQuery,
} from "../../services/authApi";
import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B556D", // Définir la couleur principale ici
    },
  },
});
const steps = [
  {
    label: "Envoyée",
  },
  {
    label: "En cours de traitement",
  },
  {
    label: "Acceptée/En attente de paiament",
  },
  {
    label: "Confirmée",
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
interface Demande {
    cc: string;
    date_emission: string;
    description: string;
    etat: string;
    facture: {
      createdAt: string;
      date_generation: string;
      demandeId: number;
      id: number;
      montant: number;
      updatedAt: string;
    
    };
    id: number;
    offreur: {
      address: string;
      apropos: string;
      city: string;
      country: string;
      createdAt: string;
      email: string;
      fname: string;
      id: number;
      lname: string;
      phone: string;
      updatedAt: string;
      userId: string;
      zip: string;
    };
    motif_annulation?: string;
    motif_refus?: string;
    offreurId: number;
    rdv: {
      address: string;
      date: string;
      demandeId: number;
      heure: string;
      id: number;
      link: string;
      type: string;
    };
    title: string;
  }
  
const SuivreDemande: React.FC<SuivreDemandeProps> = ({ demande }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [demandeRefus, setDemandeRefus] = React.useState(true);
  const [etatDemande, setEtatDemande] = React.useState("acceptee");


  const [infoDemande, setInfoDemande] = useState<Demande>({
    cc: "",
    date_emission: "",
    description: "",
    etat: "",
    facture: {
      createdAt: "",
      date_generation: "",
      demandeId: 0,
      id: 0,
      montant: 0,
      updatedAt: "",
    },
    id: 0,
    offreur: {
      address: "",
      apropos: "",
      city: "",
      country: "",
      createdAt: "",
      email: "",
      fname: "",
      id: 0,
      lname: "",
      phone: "",
      updatedAt: "",
      userId: "",
      zip: "",
    },
    offreurId: 0,
    rdv: {
      address: "",
      date: "",
      demandeId: 0,
      heure: "",
      id: 0,
      link: "",
      type: "",
    },
    title: "",
  });
  

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
    return currentDate.toISOString().split("T")[0];
  };

  const getDueDate = () => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
    return dueDate.toISOString().split("T")[0];
  };

  let infoDemandeur ={
    lname :"",
    fname:"",
    adress:"",
    phone:""
  }
    const generateInvoice = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(25);
    pdf.setFont("helvetica", "bold");
    pdf.text("Facture", 95, 25);

    pdf.addImage(logo, "PNG", 90, 30, 40, 40);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    // Utilisation de valeurs par défaut
    const currentDate = getCurrentDate();
    const dueDate = getDueDate();
    const clientName = "souhila";
    const clientAddress = "souhila";
    const clientPhone = "souhila";

    pdf.text(`Date: ${currentDate}`, 150, 70);
    pdf.text(`Due Date: ${dueDate}`, 150, 80);

    pdf.text("Bill To:", 10, 90);
    pdf.text(`Nom client: ${clientName}`, 10, 100);
    pdf.text(`Adresse: ${clientAddress}`, 10, 110);
    pdf.text(`Tel: ${clientPhone}`, 10, 120);

    let yOffset1 = 140;

    pdf.setFontSize(14);
    pdf.text("Description", 10, yOffset1);
    pdf.text("Unité", 80, yOffset1);
    pdf.text("Prix", 160, yOffset1);

    let totalAmount = 0;
    let yOffset = 150;
    const lineHeight = 3;
    const price = 50; // Exemple de prix par défaut
    pdf.line(10, yOffset1 + lineHeight, 190, yOffset1 + lineHeight);
    const items = [
      { description: "Item 1", unite: 1, prix: price },
      // Ajoutez d'autres articles si nécessaire
    ];

    pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);

    items.forEach((item) => {
      const itemTotal = item.unite * Number(item.prix);
      totalAmount += itemTotal;

      pdf.text(item.description, 10, yOffset);
      pdf.text(item.unite.toString(), 80, yOffset);
      pdf.text(`$${itemTotal.toFixed(2)}`, 160, yOffset);
      pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);

      yOffset += 10;
    });

    pdf.setFontSize(12);
    pdf.text("Total Amount:", 120, yOffset + 10);
    pdf.text(`$${totalAmount.toFixed(2)}`, 160, yOffset + 10);
    pdf.line(120, yOffset + 13, 190, yOffset + 13);

    pdf.save("invoice.pdf");
  };
  const [selectedDemande, setSelectedDemande] = useState<{
    id: number;
    titre: string;
    nomoffreur: string;
    cahierDeCharge?: string;
    description?: string;
    dateenvoie?: string;
  }>();

  console.log(selectedDemande?.description);
  const generatePDF = () => {
    if (selectedDemande) {
      const pdf = new jsPDF();

      pdf.text(`Cahier de charge : ${selectedDemande.cahierDeCharge}`, 10, 40);

      pdf.save("demande_info.pdf");
    }
  };

   const storedUserString = localStorage.getItem("user");
  let demandeurId: string = "";
  let demandeId: string = ""; // Déclarer demandeId
  const { id } = useParams<{ id: string }>();


  console.log("ID:", id);
  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    demandeurId = storedUser.demandeur.id;

    let idde: string = "";

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      demandeurId = storedUser.demandeur.id;
      infoDemandeur.lname = storedUser.demandeur.lname;
      infoDemandeur.fname = storedUser.demandeur.fname;
      infoDemandeur.adress = storedUser.demandeur.address;
      infoDemandeur.phone = storedUser.demandeur.phone

    }
// const infoDemande = {
//     title : "",
}
    const {
      data: demandee,
      error: demandeError,
      isLoading,
    } = useShowDemandeDemandeurQueryQuery({
      demandeurId: demandeurId,
      demandeId: id,
    });

    useEffect(() => {
      if (demandee && demandee.etat) {
        // Accéder à la propriété 'etat' de l'objet 'demandee'
        const etat = demandee.etat;
        setInfoDemande(demandee);
        console.log(infoDemande)


        // Définir 'activeStep' en fonction de la valeur de 'etat'
        if (etat === "envoyee") {
          setActiveStep(0);
        } else if (etat === "enCoursDeTraitement") {
          setActiveStep(1);
        } else if (etat === "acceptee") {
          setActiveStep(2);
        } else if (etat === "confirmee") {
          setActiveStep(3);
        }

        if(etat === "refus"){
            setDemandeRefus(false)
        }
        setEtatDemande(etat);
      }

      //   if (demande) {
      //     console.log("Détails de la demande:", demande);
      //     if (demande.etat != "refusee") {
      //       setEtat(true);
      //     }
      //     if (demande.etat === "acceptee") {
      //       setRdvAccepter(false);
      //     }
      //     setTextEtatRefus(demande.motif_refus);
      //   } else if (demandeError) {
      //     console.error(
      //       "Erreur lors de la récupération des détails de la demande:",
      //       demandeError
      //     );
      //   }
    }, [demandee, demandeError]);
    console.log(demandee);
    const generateInvoicer = () => {
        const pdf = new jsPDF();
    
        pdf.setFontSize(25);
        pdf.setFont("helvetica", "bold");
        pdf.text("Facture", 95, 25);
    
        pdf.addImage(logo, "PNG", 90, 30, 40, 40);
    
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
    
        pdf.text(`Date: ${getCurrentDate()}`, 150, 70);
        pdf.text(`Due Date: ${getDueDate()}`, 150, 80);
    
        pdf.text("Bill To:", 10, 90);
        pdf.text(
          `Nom client: ${infoDemandeur.fname}  ${infoDemandeur.lname}`,
          10,
          100
        );
        pdf.text(`Adresse: ${infoDemandeur.adress}`, 10, 110);
        pdf.text(`Tel: ${infoDemandeur.phone}`, 10, 120);
        
    
        let yOffset1 = 140;
    
        pdf.setFontSize(14);
        pdf.text("Description", 10, yOffset1);
        pdf.text("Unité", 80, yOffset1);
        pdf.text("Prix", 160, yOffset1);
    
        let totalAmount = 0;
        let yOffset = 150;
        const lineHeight = 3;
        const price = demandee.facture.montant || 0; // Ensure priceDemand is assigned a value
        pdf.line(10, yOffset1 + lineHeight, 190, yOffset1 + lineHeight);
        const items = [{ description: "Item 1", unite: 1, prix: price }];
    
        pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);
    
        items.forEach((item) => {
          const itemTotal = item.unite * Number(item.prix);
          totalAmount += itemTotal;
    
          pdf.text(demandee.title, 10, yOffset);
          pdf.text(item.unite.toString(), 80, yOffset);
          pdf.text(`$${demandee.facture.montant.toFixed(2)}`, 160, yOffset);
          pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);
    
          yOffset += 10;
        });
    
        pdf.setFontSize(12);
        pdf.text("Total Amount:", 120, yOffset + 10);
        pdf.text(`$${demandee.facture.montant.toFixed(2)}`, 160, yOffset + 10);
        pdf.line(120, yOffset + 13, 190, yOffset + 13);
    
        pdf.save("invoice.pdf");
      };

      function convertDate(myDate: string): string {
   
        var date = new Date(myDate.toString());
    
        var jour = date.getDate(); 
        var mois = (date.getMonth() + 1).toString().padStart(2, '0');
        var annee = date.getFullYear();
        const newDateEmission = jour + "/" + mois + "/" + annee ;
        return newDateEmission;
    }

    const [createCheckoutSession] = useCreateCheckoutSessionMutationMutation();

    const handlePayment = async () => {
      try {
        const result = await createCheckoutSession({
          demandeurId: demandeurId,
          demandeId: demandee.id,
        });
  
        // Vérifier si la réponse contient des données
        if ("data" in result) {
          const { data } = result;
  
          // Accès aux données de la session de paiement
          const sessionId = data.session.id;
          const amountTotal = data.session.amount_total;
          const currency = data.session.currency;
  
          // Accès aux données de la demande
          const demandeId = data.demande.id;
          const demandeTitle = data.demande.title;
          const demandeOffreur = data.demande.offreur;
          const offreurFname = demandeOffreur.fname;
          const offreurLname = demandeOffreur.lname;
  
          // Utiliser les données comme nécessaire
          console.log("ID de session de paiement :", sessionId);
          console.log("Montant total :", amountTotal, currency);
          console.log("ID de la demande :", demandeId);
          console.log("Titre de la demande :", demandeTitle);
          console.log("Prénom de l'offreur :", offreurFname);
          console.log("Nom de l'offreur :", offreurLname);

          
          window.location.href = data.session.url;
          // Rediriger vers la page de paiement ou effectuer d'autres actions nécessaires
        } else {
          console.error(
            "Erreur lors de la création de la session de paiement :",
            result.error
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la création de la session de paiement :",
          error
        );
      }
    };
  
    return (
      <>
        {" "}
        <Navdashboard />
        <SidDemandeur />
        <Box
          sx={{
            position: "relative",
            left: "240px",
            width: "calc(100% - 240px)",
            top: "70px",
          }}
        >
         {demandeRefus ? (
          <>
      
            <>
          <div>
            <h1 style={{ padding: "20px" }}>Suivre demande {etatDemande}</h1>
            <div style={{ display: "flex" }}>
              {" "}
              <ThemeProvider theme={theme}>
                <div style={{ width: "60%", padding: "40px" }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>ID:</strong> {infoDemande.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Titre:</strong> {infoDemande.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Nom Offreur:</strong> {infoDemande.offreur.fname}
                  </Typography>

                  <>
                    <Typography variant="body1" gutterBottom>
                      <strong>Cahier de charge:</strong>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={generatePDF}
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#3B556D",
                          color: "white",
                        }}
                      >
                        PDF
                      </Button>
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Description:</strong>{" "}
                      {infoDemande.description}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Date Envoie:</strong>{" "}
                      {convertDate(infoDemande.date_emission)}
                    </Typography>
                  </>
                </div>

                <Box sx={{ width: "40%", padding: "20px" }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
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
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
                      {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                        Reset
                                    </Button> */}
                    </Paper>
                  )}
                </Box>
              </ThemeProvider>
            </div>
          </div>
          </>
        
            <>
          { etatDemande === "enCoursDeTraitement"  && (
            <>
          <div className="div-demande">
            <div className="div-rdv">
              <h1>Rendez-vous</h1>
              <div>
                {demandee && demandee.rdv && (
                  <div>
                    {demandee.rdv.date && (
                      <span>Date : {demandee.rdv.date}</span>
                    )}
                    {demandee.rdv.heure && (
                      <span>Heure : {demandee.rdv.heure}</span>
                    )}
                    {demandee.rdv.type && (
                      <span>Type : {demandee.rdv.type}</span>
                    )}
                    {demandee.rdv.type === "visio" && demandee.rdv.link && (
                      <span>Lien : {demandee.rdv.link}</span>
                    )}
                    {demandee.rdv.type !== "visio" && demandee.rdv.address && (
                      <span>Endroit : {demandee.rdv.address}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </div>
          </div>
          </>
          )}
          { (etatDemande === "acceptee" || etatDemande === "confirmee")&& (
            <>
          <hr className="hr-1" />
          <div className="div-facture">
            <h1>Facture</h1>
            <div>
              <div>
                <span>Télécharger la facture</span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generateInvoice}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#3B556D",
                    color: "white",
                  }}
                >
                  PDF
                </Button>
              </div>
              <button onClick={handlePayment}>Payer</button>
            </div>
          </div>
          </>)}
          </>
       
        
          </>
         ) : (
          <>
          <hr className="hr-1" />
          <div className="div-refus">
            <h1>Motif refus</h1>
            <p>
             {infoDemande.motif_refus}
            </p>
          </div>
          </>)}
        </Box>
      </>
    );
  }

export default SuivreDemande;
