import React from 'react';
import { Link } from 'react-router-dom';

const Connections = ({ connectCount, username, connects }) => {
  if (!connects || !connects.length) {
    return <p className="bg-dark text-light p-3">{username} connect with developers!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {connectCount} {connectCount === 1 ? 'connect' : 'connects'}
      </h5>
      {connects.map(connect => (
        <button className="btn w-100 display-block mb-2" key={connect._id}>
          <Link to={`/profile/${connect.username}`}>{connect.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default Connections;