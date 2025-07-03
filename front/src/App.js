import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import ProjectForm from "./pages/ProjectForm";
import Formats from "./pages/Formats";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import MoeBuilder from "./pages/MoeBuilder";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="/projects/:id" element={<ProjectForm />} />
          <Route path="/formats" element={<PrivateRoute><Formats /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/moe-builder" element={<MoeBuilder projectId="686350095b2ccf322e557dfb" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
