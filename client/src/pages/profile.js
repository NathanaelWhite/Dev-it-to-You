import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";


import Connections from "../components/connections";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_CONNECTION } from "../utils/mutations";
import Auth from "../utils/auth";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";



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

  const { username: userParam } = useParams();
 
  // adds user to connection
  const [addConnection] = useMutation(ADD_CONNECTION);
   //queries personal User
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading Page...</div>;
  }

// handles login verification
//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this
//       </h4>
//     );
//   }

  const handleClick = async () => {
    try {
      await addConnection({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
   
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </Typography>
        
        <div id='profileimg' className={classes.paper}>
          <img src="" alt='profileimg' className={classes.imgStyles} />
        </div>

        <Typography component="h1" variant="h5">
        Hello, My name is  {userParam ? `${user.me.firstname}'s` : "firstname" } 
        </Typography>
        
        
       
        {userParam && ( 
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
      </div>

        <div className={classes.paper}>
          <Connections
            username={user.username}
            connectionCount={user.connectionCount}
            connections={user.connections}
          />
        </div>
     
    </Container>
  );
};

export default Profile;