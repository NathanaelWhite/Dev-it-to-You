import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";

import Connections from "../components/connections";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_CONNECTION } from "../utils/mutations";
import Auth from "../utils/auth";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
// will be used if no profile picture
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(14),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      alignItems: "center",
      display: 'flex',
      flexWrap: 'wrap',
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const { id } = useParams();

  console.log(id);

  const [shownUser, setDisplay] = useState({});

  // adds user to connection
  const [addConnection] = useMutation(ADD_CONNECTION);
  //queries personal User
  const { loading, error, data } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { _id: id },
  });
  // const { loading, error, data } = useQuery(QUERY_USER, {
  //   variables: { _id: id },
  // });
  if (error) {
    console.log(`Error! ${error.message}`);
  }

  const user = data?.me || data?.user || {};

  useEffect(() => {
    setDisplay({ ...user });
  }, [user]);
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading Page...</div>;
  }

  // error handling login verification
    if (!user?._id) {
      return (
        <Typography>
          You need to be logged in to see this
        </Typography>
      );
    }

  const handleClick = async () => {
    try {
      await addConnection({
        variables: { id: shownUser._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs" alignItems="center">
      <CssBaseline />
      {/* showing which user you are viewing */}
      <div className={classes.paper}>
      <Grid container spacing={6} alignItems="center">
      <Box textAlign="center">
        <Typography component="h1" variant="h5">
          Viewing {id ? `${shownUser?.firstName}'s` : "your"} profile.
        </Typography>
        </Box >
        <Avatar className={classes.avatar}>
          <AccountBoxIcon fontSize="large" />
        
        {/* profile image */}
        {/* <div id="profileimg" className={classes.paper}>
          <img src="" alt="profile-img" className={classes.imgStyles} />
        </div> */}
        </Avatar>
        {/* users first name */}
        <Grid item xs={12}>
        <Typography component="h1" variant="h5">
         name: {shownUser?.firstName || "FirstName"}
        </Typography>
        </Grid>
        {/* description of user */}
        <Grid item xs={12}>
        <Typography>About: {shownUser?.description || "bio"}</Typography>
        </Grid>
        {/* users tags */}
        <Grid item xs={12}>
        <Typography>
          
          <FingerprintIcon />
          Skills: {shownUser?.tags || "tags"}
        </Typography>
        </Grid>
        {/* if connected, shows your connections email address on their page */}
        {/* currently will show email address even if not connected */}
        {data?.user &&  (
          <Grid item xs={12}>
            <Typography>
              {shownUser?._id || "emailAddress"}
            </Typography>
            </Grid>
        )} 

        {/* running case where if on own profile, can edit, 
      if on someone elses can add connection */}
<<<<<<< HEAD
        
         {data?.user &&  (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleClick}
        >
          Add Connection
        </Button>
        )} 

        
       

        {/* functional, does not show count or names */}
        <div className={classes.card}>
          <Connections
            username={shownUser.firstname}
            connectionCount={shownUser.connectionCount}
            connections={shownUser.connections}
          />
        </div>

          
        {/* edit button for updating personal profile */}
        {data?.me && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleClick}
        >
          edit profile
        </Button>
    )}
        </Grid>
=======

        {data?.user && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Add Connection
          </Button>
        )}

        {/* edit button for updating personal profile */}
        {data?.me && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
            component={Link}
            to={"/update"}
          >
            edit profile
          </Button>
        )}

        {/* functional, not styled shows up as small bars */}
        <div className={classes.paper}>
          <Connections
            username={shownUser.firstname}
            connectionCount={shownUser.connectionCount}
            connections={shownUser.connections}
          />
        </div>
>>>>>>> develop
      </div>
    </Container>
  );
};

export default Profile;
