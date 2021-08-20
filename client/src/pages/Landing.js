import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SignUp from "./signup-form";
import Login from "./login";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <main>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>Dev Me Up</h1>
            </Paper>
          </Grid>
          <p>
            Let'd find some developers and make a project out of this world!
          </p>
          <button>Login</button>
          <button>Sign Up</button>
          {/* <SignUp /> */}
          {/* <Login /> */}
        </Grid>
      </div>
    </main>
  );
};
export default Landing;
