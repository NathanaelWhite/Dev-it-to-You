import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.stickToBottom}>
      <Typography>&copy;2021 by Group 2</Typography>
    </BottomNavigation>
  );
};

export default Footer;
