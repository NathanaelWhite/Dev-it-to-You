import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Auth from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  let [path, setPath] = useState(window.location.pathname);
  let history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setPath(window.location.pathname);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  if (path === "/") {
    return null;
  }

  const logout = (e) => {
    e.preventDefault();

    Auth.logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <image />
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Dev Me Up</Link>
          </Typography>
          {Auth.loggedIn() && (
            <>
              <Button color="inherit">Profile</Button>
              <Button color="inherit" onClick={logout}>
                <a href="/">Logout</a>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
