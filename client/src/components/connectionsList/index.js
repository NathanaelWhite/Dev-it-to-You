import React from 'react';
import { Link } from 'react-router-dom';

const ConnectionList = ({ Connections, title }) => {
    if (!Connections.length) {
      return <h3>No Connections Yet</h3>;
    }

    return (
        <div>
          <h3>{title}</h3>
          {Connections &&
            Connections.map(connection => (
              <div key={connection._id} className="card mb-3">
                <p className="card-header">
                  <Link
                    to={`/profile/${connection._id}`}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                  >
                    {connection._id}
                  </Link>{' '}
                  Connection created on {connection.createdAt}
                </p>
              </div>
            ))}
        </div>
      );
    };
    
    export default ConnectionList;


