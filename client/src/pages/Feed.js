import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ADD_CONNECTION } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Feed = () => {
  const classes = useStyles();

  //State
  const { userQueue, updateUserQueue } = useState([]);
  const { displayedUser, updateDisplay } = useState({});

  //Queries & Mutations
  let pageNumber = 1;

  const [getUsers, { loading, data }] = useLazyQuery(QUERY_USERS);
  const [addConnection] = useMutation(ADD_CONNECTION);

  //handle initial render
  useEffect(() => {
    //call the query function to set initial states
    getUsers({ variables: { page: pageNumber } });
    updateUserQueue([...data]);
    updateDisplay(userQueue[0]);
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
        await addConnection({
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
        await getUsers({ variables: { page: pageNumber } });
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
            {displayedUser.firstName}
          </Typography>
          <Typography>{displayedUser.description}</Typography>
        </CardContent>
        <CardActions>
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
        </CardActions>
      </Card>
    </main>
  );
};
export default Feed;
