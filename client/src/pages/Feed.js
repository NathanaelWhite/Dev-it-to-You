import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Feed = () => {
  const classes = useStyles();

  const { loading, data } = useQuery();

  //   const users = data?.

  //wrapper function for rendering
  //handle initial render
  //call the query function to set initial states
  //handle updates i.e. next user

  //wrapper function for interactions
  //possible interactions: connect or pass

  const handleInteraction = (event) => {
    if (event === 'connect') {
      //if connect, run connections mutation
      //then next user
    } else if (event === 'pass') {
      //if pass, then next user
    }
    //if select, create a user modal? to display more info?
  };

  //wrapper has sub functions

  //function for updating queue position, "next user"
  //if queue length < 5, run the query function and update the state
  //queue starts at index 0 of userdata
  //set variable to the first user with array method
  //update the state of the queue without the user returned
  //set the state of displayed user to variable
  //return the variable containing the next user

  //function for making queries to populate queue
  //run query and add data to the queue
  //function for adding connections mutation
  //get the id of the selected user
  //run mutation with id
  //returning the updated component

  const { userQueue, updateUserQueue } = useState([]);
  const { displayedUser, updateDisplay } = useState();

  return (
    <main className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {/* display the name of the user here */}
          </Typography>
          <Typography>{/* this will be the description */}</Typography>
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
