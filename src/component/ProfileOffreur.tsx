import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
  Container,
  CssBaseline,
  Link,
  createTheme,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
  Input,
  IconButton,
  Avatar,
  Modal,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
  useAddSkillsMutationMutation,
  useCreateDemandeurMutation,
  useListSkillsQuery,
  useShowOffreurQuery,
  useShowListExperienceQuery,
  useCreateExperienceMutationMutation,
  useCreateOffreurMutation,
  useModifyOffreurMutation,
  useDeleteOffreurMutation,
  useShowSkillQuery,
} from "../services/authApi";
import { User } from "../page/SignIn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/";
import AddForm from "./dashboard/AddFormProjet";

interface Demandeur {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}
interface Experience {
  title: string;
  description: string;
  link: string;
  from: string;
  to: string;
}
interface Skill {
  id: string;
  label: string;
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

const defaultTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000000",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#3B556D",
            },
            "&:hover fieldset": {
              borderColor: "#3B556D",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3B556D",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#5FC2BA",
          "&:hover": {
            backgroundColor: "#3B556D",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#3B556D",
          "&.Mui-checked": {
            color: "#3B556D",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000000",
          "&.Mui-focused": {
            color: "#3B556D",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
            color: "#000000 !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:focus": {
            borderColor: "#3B556D !important",
          },
        },
      },
    },
  },
});

interface Response {
  data?: { token: string; user: User };
  error?: FetchBaseQueryError | SerializedError;
}
const ProfileOffreur: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [openSkills, setOpenSkills] = React.useState(false);
  const [titreExperience, settitreExperience] = React.useState("");
  const [experience, setExperience] = React.useState<Experience>({
    title: "",
    description: "",
    link: "",
    from: "",
    to: "",
  });
  const [experiencesList, setExperiencesList] = useState<Experience[]>([]);

  const [skillss, setSkills] = useState<Skill[]>([]);
  const [skiloff, setSkiloff] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSkills = () => setOpenSkills(true);
  const handleCloseSkills = () => setOpenSkills(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleFieldChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setOffreurInfo((prevInfo) => ({
        ...prevInfo,
        [fieldName]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Informations du demandeur:", offreurInfo);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
      }
    }
  }, []);
  // const { data: listDemandeurs, error: listDemandeursError } = useListDemandeursQuery({});

  // État local pour stocker la liste des demandeurs
  // const [demandeurs, setDemandeurs] = useState<Demandeur[]>([]);
  // useEffect(() => {

  //   if (listDemandeurs) {
  //     console.log('Liste des Demandeurs:', listDemandeurs);

  //     setDemandeurs(listDemandeurs);
  //   } else if (listDemandeursError) {
  //     console.error('Erreur lors de la récupération de la liste des demandeurs:', listDemandeursError);
  //   }
  // }, [listDemandeurs, listDemandeursError]);

  let userString = localStorage.getItem("user");
  let user = userString ? JSON.parse(userString) : null;
  const userOffreurNotNull = user && user.demandeur !== null;

  const [isOffreurNotNull, setIsOffreurNotNull] =
    useState<boolean>(userOffreurNotNull);
  // create offreur
  const [createOffreurMutation] = useCreateOffreurMutation();
  const handleSave = async () => {
    try {
      const response: Response = await createOffreurMutation(offreurInfo);

      user.demandeur = { ...response.data, user: undefined };
      console.log(user.demandeur);
      localStorage.setItem("user", JSON.stringify(user));

      console.log(user);
      console.log("Demandeur créé avec succès:", response);

      setIsOffreurNotNull(true);
    } catch (error) {
      console.error("Erreur lors de la création du demandeur:", error);
    }
  };
  // uppdate demandeur

  const [modifyOffreurMutation, { data, error }] = useModifyOffreurMutation();

  const handleModify = async () => {
    try {
      const storedUser1 = localStorage.getItem("user");
      let userstore = storedUser1 ? JSON.parse(storedUser1) : null;
      console.log(userstore.demandeur.id);
      offreurInfo.id = userstore.offreur.id;

      const response = await modifyOffreurMutation(offreurInfo);
      console.log(offreurInfo);

      console.log(response);
      if (data) {
        // Mise à jour des informations dans le localStorage
        user.offreur = offreurInfo;
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Demandeur modifié avec succès:", data);
      } else if (error) {
        console.error("Erreur lors de la modification du demandeur:", error);
      }
    } catch (error) {
      console.error("Erreur lors de la modification du demandeur:", error);
    }
  };

  // delete demandeur

  const [deleteOffreurMutation] = useDeleteOffreurMutation();

  const handleDelete = async () => {
    try {
      const storedUser1 = localStorage.getItem("user");
      let userstore = storedUser1 ? JSON.parse(storedUser1) : null;

      console.log(userstore.offreur.id);
      const response = await deleteOffreurMutation(userstore.offreur.id);
      if ("data" in response) {
        console.log("offreur supprimé avec succès:", response.data);
        setOffreurInfo({
          id: "",
          fname: "",
          lname: "",
          phone: "",
          address: "",
          apropos: "",
          country: "",
          city: "",
          zip: "",
        });
        user.offreur = null;
        setIsOffreurNotNull(false);

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.error("Erreur lors de la suppression du off:", response.error);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du off:", error);
    }
  };

  const [offreurInfo, setOffreurInfo] = useState({
    id: user.offreur?.id ? String(user.offreur.id) : "",
    fname: user.offreur?.fname || "",
    lname: user.offreur?.lname || "",
    phone: user.offreur?.phone || "",
    address: user.offreur?.address || "",
    country: user.offreur?.country || "",
    city: user.offreur?.city || "",
    zip: user.offreur?.zip || "",
    apropos: user.offreur?.apropos || "",
  });
  const storedUserString = localStorage.getItem("user");
  let offreurId: string = "";
  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    offreurId = storedUser.offreur.id;
  }
  // const [addSkillsMutation] = useAddSkillsMutationMutation();

  const { data: experiences } = useShowListExperienceQuery(offreurId);

  useEffect(() => {
    console.log("La valeur de experiences a changé :", experiencesList);
  }, [experiences]);

  const [addSkillsMutation] = useAddSkillsMutationMutation();
  const handleAddSkills = async () => {
    try {
      const newSkill = selectedSkill
        ? { id: selectedSkill.id, label: selectedSkill.label, level: 3 }
        : null;
      const response = await addSkillsMutation({
        body: { skills: [newSkill] },
        offreurId: offreurId,
      });

      console.log("Compétences ajoutées avec succès:", response);
    } catch (error) {
      console.error("Erreur lors de l'ajout des compétences:", error);
    }
  };
  // const cur = [
  //   { value: "java", label: "java" },
  //   { value: "php", label: "php" },
  //   { value: "python", label: "python" },
  //   zz
  // ];
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const { data: listSkills } = useListSkillsQuery({});

  useEffect(() => {
    if (listSkills) {
      console.log("Liste des compétences:", listSkills);
      setSkills(listSkills);
    }
  }, [listSkills]);

  const [createExperience] = useCreateExperienceMutationMutation();

  const handleValiderClick = async () => {
    try {
      const experienceInfo = {
        title: experience.title,
        description: experience.description,
        link: experience.link,
        from: experience.from,
        to: experience.to,
      };

      const result = await createExperience({
        offreurId: offreurId,
        body: experienceInfo,
      });
      console.log("Expérience créée avec succès !", result);
    } catch (error) {
      console.error("Erreur lors de la création de l'expérience :", error);
    }
  };
  //   const id = 2;
  // const { data: skill } = useShowSkillQuery(id);
  if (storedUserString) {
    const storedUser = JSON.parse(storedUserString);
    offreurId = storedUser.offreur.id;
  }
  const { data: offreur, isLoading } = useShowOffreurQuery(offreurId);

  if (!offreur) {
    return <div>Offreur not found</div>;
  }

  const { fname, lname, apropos, skills, evaluations } = offreur;
  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Card
            style={{
              marginBottom: "30px",
              marginTop: "70px",
              paddingBottom: "30px",
              maxWidth: "700px",
              padding: "50px",
            }}
          >
            <div>
              <div>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={10}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ textAlign: "center", marginBottom: "20px" }}
                    >
                      Mon Profil
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                    />
                    <label
                      htmlFor="icon-button-file"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "30px",
                      }}
                    >
                      <IconButton color="primary" component="span">
                        <Avatar sx={{ width: 100, height: 100 }}>
                          {username ? username[0].toUpperCase() : ""}
                        </Avatar>
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={offreurInfo.fname}
                    onChange={handleFieldChange("fname")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={offreurInfo.lname}
                    onChange={handleFieldChange("lname")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    value={offreurInfo.address}
                    onChange={handleFieldChange("phone")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={offreurInfo.address}
                    onChange={handleFieldChange("email")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Adresse"
                    fullWidth
                    value={offreurInfo.address}
                    onChange={handleFieldChange("address")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Country"
                    fullWidth
                    value={offreurInfo.country}
                    onChange={handleFieldChange("country")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="City"
                    fullWidth
                    value={offreurInfo.city}
                    onChange={handleFieldChange("city")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Zip"
                    fullWidth
                    value={offreurInfo.zip}
                    onChange={handleFieldChange("zip")}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid container justifyContent="center">
              {isOffreurNotNull ? (
                // Afficher le bouton Modify si le champ 'demandeur' n'est pas null
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onClick={handleModify}
                >
                  Modify
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onClick={handleSave}
                >
                  save
                </Button>
              )}
              {!!isOffreurNotNull && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Card>
        </ThemeProvider>
        <ThemeProvider theme={defaultTheme}>
          <Card
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              paddingBottom: "30px",
              width: "800px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <h2>Experience</h2>
              <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleOpenSkills}
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#3B556D",
                  color: "white",
                  padding: "10px",
                  "&:active": {
                    backgroundColor: "#3B556D",
                  },
                  "&:focus": {
                    backgroundColor: "#3B556D",
                  },
                }}
              >
                Ajouter
              </Button>
            </div>
            <div>
              {experiences &&
                experiences.map((experience: Experience, index: number) => (
                  <>
                    <div key={index} style={{ padding: "20px" }}>
                      <h3>{experience.title}</h3>

                      <p>{experience.description}</p>
                      <p>
                        From: {experience.from} - To: {experience.to}
                      </p>
                    </div>
                    <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
                  </>
                ))}
            </div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid item xs={12}>
                    <div style={{ marginBottom: "30px" }}>
                      <h2>Ajouter experience</h2>
                    </div>
                    <TextField
                      label="titre"
                      fullWidth
                      value={experience.title}
                      sx={{ marginBottom: "20px" }}
                      onChange={(event) =>
                        setExperience({
                          ...experience,
                          title: event.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      fullWidth
                      sx={{ marginBottom: "20px" }}
                      rows={3}
                      value={experience.description}
                      onChange={(event) =>
                        setExperience({
                          ...experience,
                          description: event.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Link"
                      fullWidth
                      value={experience.link}
                      sx={{ marginBottom: "20px" }}
                      onChange={(event) =>
                        setExperience({
                          ...experience,
                          link: event.target.value,
                        })
                      }
                    />
                    <TextField
                      label="from"
                      fullWidth
                      value={experience.from}
                      sx={{ marginBottom: "20px" }}
                      onChange={(event) =>
                        setExperience({
                          ...experience,
                          from: event.target.value,
                        })
                      }
                    />

                    <TextField
                      label="to"
                      fullWidth
                      value={experience.to}
                      sx={{ marginBottom: "20px" }}
                      onChange={(event) =>
                        setExperience({ ...experience, to: event.target.value })
                      }
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button variant="contained" onClick={handleValiderClick}>
                        Valider
                      </Button>
                    </div>
                  </Grid>
                </Box>
              </Modal>
            </div>
          </Card>
        </ThemeProvider>
        <ThemeProvider theme={defaultTheme}>
          <Card
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              paddingBottom: "30px",
              width: "700px",
              padding: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}
            >
              <h2>Skills</h2>
              <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleOpenSkills}
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#3B556D",
                  color: "white",
                  padding: "10px",
                  "&:active": {
                    backgroundColor: "#3B556D",
                  },
                  "&:focus": {
                    backgroundColor: "#3B556D",
                  },
                }}
              >
                Ajouter
              </Button>
            </div>
            <Modal
              open={openSkills}
              onClose={handleCloseSkills}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid item xs={12}>
                  <div style={{ marginBottom: "30px" }}>
                    <h2>Ajouter skill</h2>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Client"
                    variant="outlined"
                    size="small"
                    select
                    sx={{
                      minWidth: "100%",
                      marginBottom: "20px",
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
                        borderColor: "#3B556D",
                      },
                    }}
                    value={selectedValue}
                    onChange={handleSelectChange}
                  >
                    {skills.map((option: Skill) => (
                      <MenuItem
                        key={option.id}
                        value={option.label}
                        onClick={() =>
                          setSelectedSkill({
                            id: option.id,
                            label: option.label,
                          })
                        }
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained" onClick={handleAddSkills}>
                      Valider
                    </Button>
                  </div>
                </Grid>
              </Box>
            </Modal>

            <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
              {skills.map(
                (item: { skill: { label: string } }, index: number) => (
                  <Chip key={index} label={item.skill.label} />
                )
              )}
            </Stack>
          </Card>
        </ThemeProvider>
      </div>

      <div></div>
    </>
  );
};
export default ProfileOffreur;
