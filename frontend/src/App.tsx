import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toobar from "./components/ToolBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserInvite from "./components/User_invite";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>("");

  return (
    <>
      <Router>
        <Toobar isAuthenticated={isAuthenticated} username={username} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="userfactory/login" element={<Login />} />
            <Route path="userfactory/register" element={<Register />} />
            <Route path="userfactory/userinvite" element={<UserInvite />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
