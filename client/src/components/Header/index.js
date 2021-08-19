import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Dev Me Up</h1>
        </Link>

        <nav>
          <div>Profile</div>
          <a href="/">Logout</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
