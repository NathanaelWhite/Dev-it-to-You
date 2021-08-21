import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_CONNECTION } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  //State
  const { userQueue, updateUserQueue } = useState([]);
  const { displayedUser, updateDisplay } = useState({});

  //Queries & Mutations
  let pageNumber = 1;

  const [getUsers, { loading, data }] = useLazyQuery(QUERY_USERS);
  const [addConnection] = useMutation(ADD_CONNECTION);

  //handle initial render
  useEffect(async () => {
    //call the query function to set initial states
    getUsers({ variables: { page: pageNumber } });
    console.log(await data);
    // updateUserQueue([...data]);
    // updateDisplay(userQueue[0]);
  }, []);

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
          connectionId: displayedUser._id,
        });
        nextUser();
      } catch (e) {
        console.error(e);
      }
    } else if (event === 'pass') {
      nextUser();
    }
    //if select, create a user modal? to display more info?
  };

  //function for updating current displayed user
  const nextUser = () => {
    //if queue length < 5, run the query function and update the state
    if (userQueue.length < 5) {
      try {
        pageNumber++;
        getUsers({ variables: { page: pageNumber } });
        updateUserQueue([...userQueue, ...data]);
      } catch (e) {
        console.error(e);
      }
    }
    //queue starts at index 0 of userQueue
    //set variable to the first user
    let userToDisplay = userQueue[0];
    //set the state of displayed user to variable
    updateDisplay(userToDisplay);
    //update the state of the queue without the user
    updateUserQueue(userQueue.slice(1));
  };

  return (
    <main className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {displayedUser?.firstName || 'TestName'}
          </Typography>
          <Typography>{displayedUser?.description || 'TestDesc'}</Typography>
          {/* these buttons will run a update function */}
          <Button
            size='small'
            color='primary'
            onClick={() => handleInteraction('pass')}
          >
            Pass
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={() => handleInteraction('connect')}
          >
            Connect
          </Button>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </main>
  );
};
export default Feed;
