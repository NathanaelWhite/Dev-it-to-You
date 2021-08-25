import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_CONNECTION } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';

const Feed = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#393E41',
    },
    gridAlignmentContainer: {
      maxWidth: '90%',
      width: 'auto',
      height: '60vh',
      border: 'solid 2px #E94F37',
      borderRadius: '10%',
      boxShadow:
        '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateRows: 'repeat(5, 1fr)',
      gridTemplateAreas: `
        ' header header header header header'
        '. . . . .'
        '. desc desc desc .'
        '. . . . .'
        '. btn btn btn .'`,
    },
    gridTitle: {
      gridArea: 'header',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'calc(10px + 1vmin)',
      padding: '1em',
    },
    gridContent: {
      gridArea: 'desc',
      textAlign: 'left',
    },
    gridButtons: {
      gridArea: 'btn',
      display: 'flex',
      gap: '1em',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));
  const classes = useStyles();

  //State
  const [displayedUser, setDisplay] = useState({});

  //Queries & Mutations
  const { loading, data } = useQuery(QUERY_USERS);
  const [addConnection] = useMutation(ADD_CONNECTION);

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
    if (event === 'connect') {
      try {
        addConnection({
          variables: { id: displayedUser._id },
        });
      } catch (error) {
        console.error(error);
      }
      let userIndex = userData.indexOf(displayedUser);
      setDisplay(userData[userIndex + 1]);
    } else if (event === 'pass') {
      let userIndex = userData.indexOf(displayedUser);
      setDisplay(userData[userIndex + 1]);
    } else {
      return console.log('error');
    }
    //if select, create a user modal? to display more info?
  };

  return (
    <main className={classes.root}>
      <div className={classes.gridAlignmentContainer}>
        <div className={classes.gridTitle}>
          <Avatar
            style={{ marginRight: '14px' }}
            alt={displayedUser?.firstName || 'TestName'}
            src='/broken-image.jpg'
            className={classes.avatar}
          />
          <Typography variant='h3' color='textPrimary'>
            {displayedUser?.firstName || 'TestName'}
          </Typography>
        </div>
        <div className={classes.gridContent}>
          <Typography>{displayedUser?.description || 'TestDesc'}</Typography>
          <Typography>{displayedUser?.tags || 'TestTags'}</Typography>
        </div>

        <div className={classes.gridButtons}>
          <Button
            size='small'
            color='secondary'
            variant='outlined'
            onClick={() => handleInteraction('pass')}
          >
            Pass
          </Button>
          <Button
            size='small'
            color='primary'
            variant='outlined'
            component={Link}
            to={`/profile/${displayedUser?._id}`}
          >
            View
          </Button>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={() => handleInteraction('connect')}
          >
            Connect
          </Button>
        </div>
      </div>
    </main>
  );
};
export default Feed;
