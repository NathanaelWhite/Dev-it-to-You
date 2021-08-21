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
  const [emailErr, setEmailErr] = useState(true);
  const [firstNameErr, setFirstNameErr] = useState(true);
  const [lastNameErr, setLastNameErr] = useState(true);
  const [passwordErr, setPasswordErr] = useState(true);
  const [passwordErrText, setPasswordErrText] = useState(
    "Minimum 6 characters required"
  );
  const [buttonAble, setButtonAble] = useState(true);
  const [addUserMut, { data, loading, error }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        if (/.+@.+\..+/.test(value)) {
          setEmailErr(false);
          setUserForm({
            ...userForm,
            [name]: value,
          });
        } else {
          setEmailErr(true);
        }
        break;
      case "password":
        if (value.length >= 8) {
          setPasswordErr(false);
          setPasswordErrText("");
          setUserForm({
            ...userForm,
            [name]: value,
          });
        } else {
          setPasswordErr(true);
          setPasswordErrText("Minimum 6 characters required");
        }
        break;
      case "firstName":
        if (value) {
          setFirstNameErr(false);
          setUserForm({
            ...userForm,
            [name]: value,
          });
        } else {
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

  useEffect(() => {
    if (!emailErr && !firstNameErr && !lastNameErr && !passwordErr) {
      setButtonAble(false);
    } else {
      setButtonAble(true);
    }
  }, [emailErr, firstNameErr, lastNameErr, passwordErr]);

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

    console.log(userForm, userSkills);

    // addUserMut({
    //   variables: {
    //     ...userForm,
    //     tags: userSkills.join(" "),
    //   },
    // });
  };

  useEffect(() => {
    if (data && !error) {
      Auth.login(data.addUser.token);
    }
  }, [data]);

  // console.log(data, loading, error);
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
        <form className={classes.form} noValidate onSubmit={handleClick}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={emailErr}
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
                error={passwordErr}
                helperText={passwordErrText}
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
                error={firstNameErr}
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
                error={lastNameErr}
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
                name="description"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={buttonAble}
            variant="contained"
            color="primary"
            className={classes.submit}
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
