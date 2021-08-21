import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
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
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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

export default function SignUp() {
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

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    description: "",
    tags: "",
  });
  const [userSkills, setUserSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setUserSkills([...userSkills, name]);
    } else {
      let newArr = userSkills.filter((skill) => skill !== name);
      setUserSkills(newArr);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setUserForm({
      ...userForm,
      tags: userSkills.join(" "),
    });
  };
  console.log(userForm);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FingerprintIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                id="description"
                label="Enter a description of yourself..."
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Skills</FormLabel>
                <FormGroup>
                  {skills.map((item, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            name={item.replace(" ", "").toLowerCase()}
                            onChange={(e) => {
                              handleSkillChange(e);
                            }}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="rememberPassword" color="primary" />}
                label="Remember me."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
