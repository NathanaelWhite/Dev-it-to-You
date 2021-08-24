import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";

import Connections from "../components/connections";
// import ConnectionList from "../components/connectionsList";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_CONNECTION, REMOVE_CONNECTION } from "../utils/mutations";
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
import Divider from "@material-ui/core/Divider";
// will be used if no profile picture
import AccountBoxIcon from "@material-ui/icons/AccountBox";
const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#393E41",
      color: "#F6F7EB",
    },

    paper: {
      marginTop: theme.spacing(14),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    avatar: {
      margin: theme.spacing(20),
      width: "150px",
      height: "150px",
      borderRadius: "20%",
      // position: "relative",
      top: "auto",
      color: theme.palette.primary.main,
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

  const classes = useStyles();

  const { id } = useParams();

  console.log(id);

  const [shownUser, setDisplay] = useState({});

  // adds user to connection
  const [addConnection] = useMutation(ADD_CONNECTION);

  //deletes a connection
  const [removeConnection] = useMutation(REMOVE_CONNECTION);
  //queries personal User
  const { loading, error, data } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { _id: id },
  });

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
    return <Typography>You need to be logged in to see this</Typography>;
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

  const handleClickdelete = async () => {
    try {
      await removeConnection({
        variables: { id: shownUser._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs" alignItems="center">
      <CssBaseline />

      <div elevation={0} className={classes.root}>
        <Grid container spacing={6} alignItems="center">
          <div id="user">
            <Avatar
              alt="profile picture"
              src="/broken-image.jpg"
              className={classes.avatar}
            >
              <AccountBoxIcon fontSize="large" />
            </Avatar>
          </div>

          <Divider />
          {/* profile image */}
          {/* <div id="profileimg" className={classes.paper}>
          <img src="" alt="profile-img" className={classes.imgStyles} />
        </div> */}

          {/* showing which user you are viewing */}
          <Box textAlign="center" >
            <Typography component="h1" variant="h5">
              Viewing {id ? `${shownUser?.firstName}'s` : "your"} profile.
            </Typography>
          </Box>

          {/* users first name, not used because redundancy */}
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              {shownUser?.firstName || "FirstName"}{" "}
              {shownUser?.lastName || "LastName"}
            </Typography>
          </Grid>

          {/* description of user */}
          <Box fontStyle="italic" lineHeight={5}>
            About: {shownUser?.description || "bio"}
          </Box>
          {/* <Grid item xs={12}>
            <Typography>About: {shownUser?.description || "bio"}</Typography>
          </Grid> */}

          {/* users tags */}
          <Grid item xs={12}>
            <Typography>
              <FingerprintIcon />
              Skills: {shownUser?.tags || "tags"}
            </Typography>
          </Grid>

          {/* if connected, shows your connections email address on their page */}
          {/* currently will show email address even if not connected */}
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="caption">Email:</Typography>
          </Grid>
          {/* {data?.user && ( */}
          <Grid item xs={12}>
            <Typography>{shownUser?.email || "emailAddress"}</Typography>
          </Grid>
          {/* )} */}

         {/* adds connection to user */}
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
            {/* removes connection to user */}
          {data?.user && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClickdelete}
            >
              remove Connection
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
              component={Link}
              to={"/update"}
            >
              edit profile
            </Button>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default Profile;
