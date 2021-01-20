import React from "react";
import '../styles/Header.scss';

const Header = () => {
  return (
    <div className="header-section">
      <h2 className="title">I'm I been followed on GIthub</h2>
      <p className="more-info">
        Display users who are followed by the primary user, and are following
        the secondary user.
      </p>
    </div>
  );
};

export default Header;