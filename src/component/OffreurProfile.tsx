import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import "../style/OffreurProfile.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  useShowOffreurQuery,
  useShowListExperienceQuery,
  useCreateDemandeMutation,
} from "../services/authApi";
import { ConstructionOutlined } from "@mui/icons-material";
import { csCZ } from "@mui/x-date-pickers";
import NavBar from "./NavBar";

interface Experience {
  title: string;
  description: string;
  link: string;
  from: string;
  to: string;
}

// Définition du type pour la compétence
interface Skill {
  level: number;
  skill: {
    label: string;
  };
}

interface Offreur {
  fname: string;
  lname: string;
  apropos: string;
  country: string;
  city: string;
  zip: string;
  skills: Skill[];
  experiences: Experience[];

  _count: {
    evaluations: number;
  };
}
interface Demande {
  titre: string;
  description: string;
  pdf: string;
}
const OffreurProfile: React.FC<{}> = ({}) => {
  const [openGenerateDemande, setOpenGenerateDemande] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cc, setCc] = useState<string>("");

  const handleOpenGenerateDem = () => setOpenGenerateDemande(true);
  const handleCloseDemande = () => {
    setOpenGenerateDemande(false);
    setCc("");
    setTitle("");
    setDescription("");
  };

  const [offreurInfo, setOffreurInfo] = useState<Offreur>({
    fname: "",
    lname: "",
    apropos: "",
    country: "",
    city: "",
    zip: "",
    skills: [],
    experiences: [],
    _count: {
      evaluations: 0,
    },
  });

  // const { fname, lname, apropos, skills, evaluations } = offreur;

  // console.log(
  // const [getOffreurByID] = useGetOffreurByIDMutation(); // On utilise la mutation

  // useEffect(() =>
  //     if (id) {
  //       getOffreurByID({ id });

  //   }, [getOffreurByID, id// On écoute les changements de l'ID pour refaire la requête si nécessaire

  // const { data: experiences } = useShowListExperienceQuery(id);

  let idOf = "";
  const { id } = useParams<{ id: string }>(); // Optional string type for id
  if (id) {
    idOf = id;
  }
    const{data}= useShowOffreurQuery(idOf);

  // getInfoOffreur(idOf);
  useEffect(() => {
    if(data){
      setOffreurInfo({
        fname: data.fname,
        lname: data.lname,
        apropos: data.apropos,
        country: data.country,
        city: data.city,
        zip: data.zip,
        skills: data.skills ?? [],
        experiences: data.experiences ?? [],
        _count: {
          evaluations: 0,
        },
      });
    }
  }, [data]);
  // useEffect(() => {
  //   // console.log(response)
  //   // console.log(offreur+"bbbbbbbbbb")
  //   // if (offreur) {
  //   //   setOffreurInfo({
  //   //     fname: offreur.fname ,
  //   //     lname: offreur.lname,
  //   //     apropos: offreur.apropos,
  //   //     country: offreur.country,
  //   //     city: offreur.city,
  //   //     zip: offreur.zip,
  //   //     skills: offreur.skills ?? [],
  //   //     experiences: offreur.experiences ?? [],
  //   //     _count: {
  //   //       evaluations:  0,
  //   //     },
  //   //   });
  //     console.log("aaaaaaaaaaaaaaaaa")
  //   }
  //   console.log(offreur)
  // }, []);

  // const averageRating =
  //   evaluations.reduce((acc: any, curr: any) => acc + curr.note, 0) /
  //   evaluations.length;

  const [createDemandeMutation] = useCreateDemandeMutation();
  const handleSendDemande = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (cc) {
        formData.append("cc", cc);
      }
      formData.append("offreurId",idOf)
      console.log(formData);
      const storedUser1 = localStorage.getItem("user");
      let userstore = storedUser1 ? JSON.parse(storedUser1) : null;
      const demandeurId = userstore.demandeur.id;
      const response = await createDemandeMutation({
        body: formData,
        demandeurId,
      });
      alert("Demande envoyée avec succès");
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
    }
  };
  return (
    <><NavBar />
    <section className="profile-offreur">
      <h1> Profile Ofrreur</h1>
      <div>
        <div className="avatar-div">
          <Avatar sx={{ width: 100, height: 100, textAlign: "center" }}>
            {offreurInfo.fname && offreurInfo.lname
              ? `${offreurInfo.fname[0].toUpperCase()}${offreurInfo.lname[0].toUpperCase()}`
              : ""}
          </Avatar>
        </div>
        <h1>{`${offreurInfo.fname} ${offreurInfo.lname}`}</h1>
        <p>{offreurInfo.apropos}</p>
      </div>

      <div>
        <h2>Experiences</h2>
        {offreurInfo.experiences.map(
          (experience: Experience, index: number) => (
            <div key={index}>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <p>
                From: {experience.from} - To: {experience.to}
              </p>
            </div>
          )
        )}
      </div>

      <div>
        <h2>Skills</h2>
        <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
          {offreurInfo.skills.map((skill: Skill, index: number) => (
            <Chip key={index} label={skill.skill.label} />
          ))}
        </Stack>
      </div>
      <div>
        <h2>Evaluations</h2>
        <Rating
          name="half-rating-read"
          defaultValue={4}
          precision={4}
          readOnly
        />
        {/* <ul>
          {evaluations.map((evaluation: any) => (
            <li key={evaluation.id}>
              <Rating
                name={`rating-${evaluation.id}`}
                value={getRatingValue(evaluation.note)}
                precision={1}
                readOnly
              />
              <p>Commentaire: {evaluation.commentaire}</p>
              <p>Date: {evaluation.date}</p>
            </li>
          ))}
        </ul> */}
      </div>

      <Button
        id="monBoutonContactez" 
        type="submit"
        // variant="contained"
        style={{ marginTop: "30px", backgroundColor: "#3B556D" }}
        onClick={() => setOpenGenerateDemande(true)}
      >
        Contactez
      </Button>

      <Modal open={openGenerateDemande} onClose={handleCloseDemande}>
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
            Envoyer une demande de service
          </Typography>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleCloseDemande}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                id="title-field" 
                fullWidth
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description-field"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
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
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                label="cc"
                id="cc-field"
                fullWidth
                value={cc}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCc(e.target.value)
                }
              />
            </Grid>
            {/* <Grid item xs={12}>
                <label >cc</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setCc(e.target.files[0]);
                  }
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: "#3B556D", color: "white" }}
                variant="contained"
                id="sendButton"
                onClick={handleSendDemande}
              >
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </section>
    </>
  );
};

export default OffreurProfile;
