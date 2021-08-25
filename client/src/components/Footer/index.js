import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    height: "100px"
  },
  space: {
    margin: "0 auto 100px",
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.space}>
    <BottomNavigation className={classes.stickToBottom}>
      <Typography>&copy;2021 by Group 2</Typography>
    </BottomNavigation>
    </div>
  );
};

export default Footer;
