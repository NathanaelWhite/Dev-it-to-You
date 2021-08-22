import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import Connections from "../components/connections";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_CONNECTION } from "../utils/mutations";
import Auth from "../utils/auth";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
// will be used if no profile picture
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* showing which user you are viewing */}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Viewing {id ? `${shownUser?.firstName}'s` : "your"} profile.
        </Typography>
        {/* profile image */}
        <div id="profileimg" className={classes.paper}>
          <img src="" alt="profile-img" className={classes.imgStyles} />
        </div>
        {/* users first name */}
        <Typography component="h1" variant="h5">
          {shownUser?.firstName || "FirstName"}
        </Typography>
        {/* description of user */}
        <Typography>{shownUser?.description || "bio"}</Typography>
        {/* users tags */}
        <Typography>
          <FingerprintIcon />
          {shownUser?.tags || "tags"}
        </Typography>

        {/* running case where if on own profile, can edit, 
      if on someone elses can add connection */}
        
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
      </div>
    </Container>
  );
};

export default Profile;
