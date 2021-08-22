import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();

  const skills = [
    "Front End",
    "Back End",
    "HTML",
    "CSS",
    "Java",
    "JavaScript",
    "Python",
    "SQL",
    "PHP",
    ".NET",
    "Angular",
    "React",
    "SQL",
    "NoSQL",
    "Sequelize",
    "C++",
    "ExpressJs",
    "NodeJs",
    "GraphQL",
  ];

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const [updateUser] = useMutation(UPDATE_USER);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    description: "",
    tags: "",
  });

  const [userSkills, setUserSkills] = useState([]);

  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [buttonAble, setButtonAble] = useState(true);

  useEffect(() => {
    setUserForm({
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      tags: user.tags,
    });
  }, [user]);

  useEffect(() => {
    let skillArrObj = [];
    if (user.tags) {
      let oldSkills = user.tags.split(" ");
      for (let i = 0; i < skills.length; i++) {
        let check = false;
        for (let ii = 0; ii < oldSkills.length; ii++) {
          if (skills[i].replace(" ", "").toLowerCase() === oldSkills[ii]) {
            check = true;
          }
        }
        skillArrObj.push({
          name: skills[i].replace(" ", "").toLowerCase(),
          check: check,
        });
      }
    }

    setUserSkills(skillArrObj);
  }, [user]);

  useEffect(() => {
    if (!firstNameErr && !lastNameErr) {
      setButtonAble(false);
    } else {
      setButtonAble(true);
    }
  }, [firstNameErr, lastNameErr]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return (
      <Typography component="h4" variant="h4">
        You need to be logged in to view this page.
      </Typography>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        if (value) {
          setFirstNameErr(false);
          setUserForm({
            ...userForm,
            [name]: value,
          });
        } else {
          setUserForm({
            ...userForm,
            [name]: value,
          });
          setFirstNameErr(true);
        }
        break;
      case "lastName":
        if (value) {
          setLastNameErr(false);
          setUserForm({
            ...userForm,
            [name]: value,
          });
        } else {
          setUserForm({
            ...userForm,
            [name]: value,
          });
          setLastNameErr(true);
        }
        break;
      case "description":
        setUserForm({
          ...userForm,
          [name]: value,
        });

        break;
    }
  };

  const handleSkillChange = (e) => {
    const { id } = e.target;

    let current = [...userSkills];
    current[id].check = !current[id].check;

    setUserSkills(current);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let chosenSkills = "";
    for (let i = 0; i < userSkills.length; i++) {
      if (userSkills[i].check) {
        chosenSkills = chosenSkills.concat(" ", userSkills[i].name);
      }
    }

    try {
      const { data } = await updateUser({
        variables: {
          ...userForm,
          tags: chosenSkills.trim(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Your Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={firstNameErr}
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                onChange={handleChange}
                value={userForm.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={lastNameErr}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
                value={userForm.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                id="description"
                name="description"
                label="Enter a description of yourself..."
                onChange={handleChange}
                value={userForm.description}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Skills</FormLabel>
                <FormGroup>
                  {userSkills.map((item, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            id={i}
                            name={item.name}
                            checked={item.check}
                            onClick={handleSkillChange}
                          />
                        }
                        label={skills[i]}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={buttonAble}
          >
            Update
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
