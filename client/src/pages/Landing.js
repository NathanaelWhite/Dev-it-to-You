import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      textAlign: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    marginer: {
      margin: `20px 0`,
    },
  };
});

const Landing = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography variant="h1" classes={{ root: classes.marginer }}>
        Dev Me Up
      </Typography>
      <Typography variant="body1" classes={{ root: classes.marginer }}>
        Let'd find some developers and make a project out of this world!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        classes={{ root: classes.marginer }}
        component={Link}
        to={"/login"}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        classes={{ root: classes.marginer }}
        component={Link}
        to={"/signup"}
      >
        Sign Up
      </Button>
    </main>
  );
};
export default Landing;
