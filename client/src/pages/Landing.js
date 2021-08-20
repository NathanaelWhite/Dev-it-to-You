import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Typography variant="h1">Dev Me Up</Typography>
        <Typography variant="body1">
          Let'd find some developers and make a project out of this world!
        </Typography>
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
      </Grid>
    </main>
  );
};
export default Landing;
