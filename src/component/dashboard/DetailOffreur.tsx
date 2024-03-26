import React, { ChangeEvent, useState, useEffect } from "react";
import Navdashboard from "../dashboard/Navdahboard";
import Sidenav from "./Sidenav";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddForm from "./AddFormProjet";
import CloseIcon from "@mui/icons-material/Close";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import logo from "../logo.png";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import {
  useTraiterDemandeMutationMutation,
  useRefuserDemandeMutationMutation,
  useAccepterDemandeMutationMutation,
  useShowDemandeQueryQuery,
  useCreateCheckoutSessionMutationMutation,
} from "../../services/authApi";
import dayjs from "dayjs";

interface DetailOffreurProps {
  closeEvent: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailOffreur: React.FC<DetailOffreurProps> = ({ closeEvent }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { id, titre, client, dateenvoie, description, cahierDeCharge } =
    useParams();
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
  }>();
  const [open, setOpen] = React.useState(false);
  const [isLieuEnabled, setIsLieuEnabled] = useState(false);
  const [isLienEnabled, setIsLienEnabled] = useState(true);
  const [lieu, setLieu] = useState("");
  const [lien, setLien] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset the selected date and time when closing the modal
  };

  const [openGenerateFacture, setOpenGenerateFacture] = useState(false);
  const [idDemande, setIdDemande] = useState("");
  const [clientName, setClientName] = useState("");
  const [priceDemand, setPriceDemand] = useState("");
  const [etat, setEtat] = useState(false);
  const [rdvAccepter, setRdvAccepter] = useState(true);

  const handleOpenGenerateFacture = () => {
    setOpenGenerateFacture(true);
    setRdvAccepter(true);
  };
  const handleCloseGenerateFacture = () => {
    setOpenGenerateFacture(false);
    setIdDemande("");
    setClientName("");
    setPriceDemand("");
  };

  const [refusModalOpen, setRefusModalOpen] = useState(false);
  const [refusalReason, setRefusalReason] = useState("");
  const [textEtatRefus, setTextEtatRefus] = useState("");

  const handleCloseRefusModal = () => {
    setRefusModalOpen(false);
    // Clear the refusal reason when the modal is closed
  };

  const handleOpenRefusModal = () => {
    setRefusModalOpen(true);
  };

  const handleRefusalReasonChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRefusalReason(event.target.value);
  };
  console.log(selectedDemande?.description);
  const generatePDF = () => {
    if (selectedDemande) {
      const pdf = new jsPDF();

      pdf.text(`Cahier de charge : ${cahierDeCharge}`, 10, 40);

      pdf.save("demande_info.pdf");
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

    if (name === "lieu") {
      setIsLieuEnabled(checked);
      setIsLienEnabled(!checked); //
    }
  };

  const handleCheckboxChangeLien = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;

    if (name === "lien") {
      setIsLienEnabled(checked);
      setIsLieuEnabled(!checked); // Deactivate "lieu" when "lien" is selected
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  const getDueDate = () => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
    return dueDate.toISOString().split("T")[0];
  };

  // Your generateInvoice function
  const generateInvoice = () => {
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
      `Nom client: ${demande.demandeur.fname + " " + demande.demandeur.lname}`,
      10,
      100
    );
    pdf.text(`Adresse: ${demande.demandeur.address}`, 10, 110);
    pdf.text(`Tel: ${demande.demandeur.phone}`, 10, 120);

    let yOffset1 = 140;

    pdf.setFontSize(14);
    pdf.text("Description", 10, yOffset1);
    pdf.text("Unité", 80, yOffset1);
    pdf.text("Prix", 160, yOffset1);

    let totalAmount = 0;
    let yOffset = 150;
    const lineHeight = 3;
    const price = priceDemand || 0; // Ensure priceDemand is assigned a value
    pdf.line(10, yOffset1 + lineHeight, 190, yOffset1 + lineHeight);
    const items = [{ description: "Item 1", unite: 1, prix: price }];

    pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);

    items.forEach((item) => {
      const itemTotal = item.unite * Number(item.prix);
      totalAmount += itemTotal;

      pdf.text(demande.title, 10, yOffset);
      pdf.text(item.unite.toString(), 80, yOffset);
      pdf.text(`$${demande.facture.montant.toFixed(2)}`, 160, yOffset);
      pdf.line(10, yOffset + lineHeight, 190, yOffset + lineHeight);

      yOffset += 10;
    });

    pdf.setFontSize(12);
    pdf.text("Total Amount:", 120, yOffset + 10);
    pdf.text(`$${demande.facture.montant.toFixed(2)}`, 160, yOffset + 10);
    pdf.line(120, yOffset + 13, 190, yOffset + 13);

    pdf.save("invoice.pdf");
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };
  const storedUserString = localStorage.getItem("user");
  let offreurId: string = "";
  let demandeId: string = ""; // Déclarer demandeId

  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    offreurId = storedUser.offreur.id;
    demandeId = storedUser.id;
    console.log(id); // Assurez-vous de l'initialiser avec une valeur valide
  }

  const [traiterDemande] = useTraiterDemandeMutationMutation();

  const handleTraitementDemande = () => {
    const formData = new FormData();

    formData.append("date", selectedDate);
    formData.append("heure", selectedTime);

    if (isLienEnabled) {
      formData.append("type", "visio");
      formData.append("link", "zaeaze");
      formData.append("address", lien);
    } else {
      formData.append("type", "presentiel");
      formData.append("address", "azeaze");
      formData.append("link", lieu);
    }
    handleClose();
    traiterDemande({ body: formData, offreurId, id });
  };
  //   const [motifRefus, setMotifRefus] = React.useState<string>(''); //
  const [refuserDemandeMutation] = useRefuserDemandeMutationMutation();
  const handleRefuserDemande = (motifRefus: any) => {
    const body = {
      motif_refus: motifRefus,
    };

    refuserDemandeMutation({ body, offreurId, id });
    handleCloseRefusModal();
    setEtat(false);
    setTextEtatRefus(motifRefus);
    console.log(body);
  };

  const [accepterDemandeMutation] = useAccepterDemandeMutationMutation();

  const handleAccepterDemande = async (montant: number) => {
    try {
      const body = {
        montant: montant,
      };

      const response = await accepterDemandeMutation({ body, offreurId, id });
      console.log("Demande acceptée avec succès", response);
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande", error);
    }
  };
  const montant: number = parseFloat(priceDemand);

  let idoffreur: string = "";

  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    idoffreur = storedUser.offreur.id;
  }
  console.log(idoffreur);
  const {
    data: demande,
    error: demandeError,
    isLoading,
  } = useShowDemandeQueryQuery({ offreurId: idoffreur, demandeId: id });
  console.log(id);
  useEffect(() => {
    if (demande) {
      console.log("Détails de la demande:", demande);
      if (demande.etat != "refusee") {
        setEtat(true);
      }
      if (demande.etat === "acceptee") {
        setRdvAccepter(false);
      }
      setTextEtatRefus(demande.motif_refus);
    } else if (demandeError) {
      console.error(
        "Erreur lors de la récupération des détails de la demande:",
        demandeError
      );
    }
  }, [demande, demandeError]);

  const motifRefus = refusalReason;

  localStorage.setItem("motif_refus", motifRefus);

  const valeurStockee = localStorage.getItem("motif_refus");
  console.log(valeurStockee);

  const [createCheckoutSession] = useCreateCheckoutSessionMutationMutation();
  

  return (
    <>
      <Navdashboard />
      <Sidenav />

      <Box
        sx={{
          position: "relative",
          left: "240px",
          width: "calc(100% - 240px)",
          top: "70px",
        }}
      >
        <>
          {etat ? (
            <div>
              <div>
                <div>
                  <h1 style={{ padding: "20px" }}>Suivre demande</h1>

                  <div style={{ display: "flex" }}>
                    <div style={{ width: "60%", padding: "40px" }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>ID:</strong> {id}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Titre:</strong>{" "}
                        {titre !== undefined ? titre : "Default Title"}
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
                          <strong>Description:</strong> {description}
                        </Typography>
                      </>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "30px",
                      }}
                    >
                      <Button
                        style={{
                          padding: "15px 20px",
                          margin: "0 5px",
                          background: "#3B556D",
                          color: "white",
                          fontWeight: 400,
                          borderRadius: "5px",
                          textDecoration: "none",
                          display: "inline-block",
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
                        <Box sx={style}>
                          <Typography variant="h5" align="center">
                            Planifier RDV
                          </Typography>
                          <IconButton
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                            }}
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
                                value={selectedDate}
                                onChange={handleDateChange}
                                sx={{
                                  minWidth: "100%",
                                  "& .MuiInputLabel-root": {
                                    color: "#3B556D",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#3B556D !important", // Utilisation de !important pour forcer la priorité
                                    },
                                  "& .Mui-focused .MuiInputLabel-root": {
                                    color: "#3B556D !important", // Utilisation de !important pour forcer la priorité
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
                                  minWidth: "100%",
                                  "& .MuiInputLabel-root": {
                                    color: "#3B556D",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#3B556D !important", // Utilisation de !important pour forcer la priorité
                                    },
                                  "& .Mui-focused .MuiInputLabel-root": {
                                    color: "#3B556D !important",
                                  },
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="lieu"
                                    checked={isLieuEnabled}
                                    onChange={handleCheckboxChangeLieu}
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        color: "#3B556D",
                                      },
                                      "&.Mui-checked": {
                                        color: "#3B556D",
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
                                  value={lieu}
                                  onChange={(e) => setLieu(e.target.value)}
                                  size="small"
                                  sx={{
                                    minWidth: "100%",
                                    "& .MuiInputLabel-root": {
                                      color: "#3B556D",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#3B556D",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#3B556D",
                                      },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#3B556D", // Couleur de bordurlorsqu'il est en surbrillance
                                      },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                      color: "#3B556D", // Couleur de l'étiquette lorsqu'il est en surbrillance
                                    },
                                  }}
                                />
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="lien"
                                    checked={isLienEnabled}
                                    onChange={handleCheckboxChangeLien}
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        color: "#3B556D",
                                      },
                                      "&.Mui-checked": {
                                        color: "#3B556D",
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
                                  value={lien}
                                  onChange={(e) => setLien(e.target.value)}
                                  size="small"
                                  sx={{
                                    minWidth: "100%",
                                    "& .MuiInputLabel-root": {
                                      color: "#3B556D",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#3B556D",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#3B556D",
                                      },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#3B556D",
                                      },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                      color: "#3B556D",
                                    },
                                  }}
                                />
                              )}
                            </Grid>

                            <Grid item xs={12}>
                              <Typography variant="h5" align="center">
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "#3B556D",
                                    color: "white",
                                  }}
                                  onClick={handleTraitementDemande}
                                >
                                  Envoyer
                                </Button>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Modal>
                      <Button
                        style={{
                          padding: "15px 20px",
                          margin: "0 5px",
                          background: "#3B556D",
                          color: "white",
                          fontWeight: 400,
                          borderRadius: "5px",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        onClick={handleOpenGenerateFacture}
                      >
                        Génerer Facture
                      </Button>
                      <Modal
                        open={openGenerateFacture}
                        onClose={handleCloseGenerateFacture}
                      >
                        <Box
                          sx={{
                            position: "absolute" as "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <Typography variant="h5" align="center">
                            Générer Facture
                          </Typography>
                          <IconButton
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                            }}
                            onClick={handleCloseGenerateFacture}
                          >
                            <CloseIcon />
                          </IconButton>
                          <Grid container spacing={2}>
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
                                  minWidth: "100%",
                                  "& .MuiInputLabel-root": {
                                    color: "#3B556D",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#3B556D !important", // Utilisation de !important pour forcer la priorité
                                    },
                                  "& .Mui-focused .MuiInputLabel-root": {
                                    color: "#3B556D !important",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Prix Demandé"
                                variant="outlined"
                                fullWidth
                                type="Number"
                                value={priceDemand}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  setPriceDemand(e.target.value)
                                }
                                sx={{
                                  minWidth: "100%",
                                  "& .MuiInputLabel-root": {
                                    color: "#3B556D",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3B556D",
                                  },
                                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#3B556D !important", // Utilisation de !important pour forcer la priorité
                                    },
                                  "& .Mui-focused .MuiInputLabel-root": {
                                    color: "#3B556D !important",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                style={{
                                  backgroundColor: "#3B556D",
                                  color: "white",
                                }}
                                variant="contained"
                                onClick={() => handleAccepterDemande(montant)}
                              >
                                Générer Facture
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Modal>

                      <Button
                        style={{
                          padding: "15px 20px",
                          margin: "0 5px",
                          background: "#3B556D",
                          color: "white",
                          fontWeight: 400,
                          borderRadius: "5px",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        onClick={handleOpenRefusModal}
                      >
                        Refuser
                      </Button>
                    </div>
                    <Modal
                      open={refusModalOpen}
                      onClose={handleCloseRefusModal}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          position: "absolute" as "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography variant="h5" align="center">
                          Motif de Refus
                        </Typography>
                        <IconButton
                          style={{ position: "absolute", top: "0", right: "0" }}
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
                              "& .MuiInputLabel-root": {
                                color: "#3B556D",
                              },

                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3B556D",
                              },

                              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3B556D",
                                },
                              "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3B556D",
                                },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#3B556D",
                              color: "white",
                            }}
                            onClick={() => handleRefuserDemande(refusalReason)}
                          >
                            Envoyer
                          </Button>
                        </Grid>
                      </Grid>
                    </Modal>
                  </div>
                </div>
              </div>

              <>
                {  (
                  <div className="div-demande">
                    <div className="div-rdv">
                      <h1>Rendez-vous</h1>
                      <div>
                        <span>Date : {demande.rdv.date}</span>
                        <span>Heure : {demande.rdv.heure}</span>
                        <span>Type : {demande.rdv.type}</span>

                        {demande.rdv.type === "visio" ? (
                          <span>Lien : {demande.rdv.link}</span>
                        ) : (
                          <span>Endroit : {demande.rdv.address}</span>
                        )}
                      </div>
                    </div>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar defaultValue={dayjs(demande.rdv.date)} disabled />
                    </LocalizationProvider> */}
                  </div>
                )}
                <hr className="hr-1" />
                <div className="div-facture">
                  <h1>Facture</h1>
                  <div>
                    <div>
                      <span>Télécharger la facture</span>
                      <a href="#" onClick={generateInvoice}>
                        PDF
                      </a>
                    </div>

                    {/* <a href="#" >Payer</a> */}
                  </div>
                </div>
              </>
            </div>
          ) : (
            <div className="div-refus">
              <h1>Motif refus</h1>
              <p>{textEtatRefus}</p>
            </div>
          )}
        </>
      </Box>
    </>
  );
};

export default DetailOffreur;
