import React from 'react';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

const Connections = ({ connectionCount, firstname, connections }) => {
  if (!connections || !connections.length) {
    return <Typography component="h1" variant="h5">{firstname} connect with developers!</Typography>;
  }

  return (
    <div>
      <h5 >
        your {connectionCount} {connectionCount === 1 ? 'connect' : 'connections'}
      </h5>
      {connections.map(connection => (
        <button className="btn w-100 display-block mb-2" key={connection._id}>
          <Link to={`/profile/${connection._id}`}>{connection._id}</Link>
        </button>
      ))}
    </div>
  );
};

export default Connections;