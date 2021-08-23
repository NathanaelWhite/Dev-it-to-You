import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_CONNECTION } from "../utils/mutations";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const Feed = () => {
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
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardContent: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  //State
  const [displayedUser, setDisplay] = useState({});

  //Queries & Mutations
  const { loading, data } = useQuery(QUERY_USERS);
  const [addConnection, { error }] = useMutation(ADD_CONNECTION);

  //Query data
  const userData = data?.allUsers || [];

  //handle initial render
  useEffect(() => {
    // if (!Auth.loggedIn()) {
    //   <Redirect push to='/' />;
    // }

    setDisplay(userData[0]);
  }, [userData]);

  if (loading) {
    //Add clever loading page here for fun polish
    return <div>loading...</div>;
  }

  //wrapper function for interactions
  //possible interactions: connect or pass
  const handleInteraction = (event) => {
    if (event === "connect") {
      try {
        addConnection({
          variables: { id: displayedUser._id },
        });
      } catch (error) {
        console.error(error);
      }
      let userIndex = userData.indexOf(displayedUser);
      setDisplay(userData[userIndex + 1]);
    } else if (event === "pass") {
      let userIndex = userData.indexOf(displayedUser);
      setDisplay(userData[userIndex + 1]);
    } else {
      return console.log("error");
    }
    //if select, create a user modal? to display more info?
  };

  return (
    <main className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {displayedUser?.firstName || "TestName"}
          </Typography>
          <Typography>{displayedUser?.description || "TestDesc"}</Typography>
          <Typography>{displayedUser?.tags || "TestTags"}</Typography>
          <Button
            size="small"
            color="primary"
            onClick={() => handleInteraction("pass")}
          >
            Pass
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => handleInteraction("connect")}
          >
            Connect
          </Button>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/profile/${displayedUser?._id}`}
          >
            View
          </Button>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </main>
  );
};
export default Feed;
