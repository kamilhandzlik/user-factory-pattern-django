import React from "react";
import { Link } from "react-router-dom";
import "./ToolBar.css";

type Props = {
  isAuthenticated: boolean;
  username?: string;
};

const Toobar: React.FC<Props> = ({ isAuthenticated, username }) => {
  return (
    <header className="toolbar">
      <h1 className="toolbar-title">🌟 UserFactory</h1>
      <nav className="toolbar-nav">
        {!isAuthenticated ? (
          <>
            <Link to="/userfactory/login" className="toolbar-link">
              Login
            </Link>
            <Link to="/userfactory/register" className="toolbar-link">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="toolbar-user">Hello {username} </span>
            <button className="toolbar-link">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Toobar;
