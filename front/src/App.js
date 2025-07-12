// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

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
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout><Dashboard /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Layout><Clients /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Layout><Projects /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <Layout><ProjectForm /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/formats"
            element={
              <PrivateRoute>
                <Layout><Formats /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout><Users /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/moe-builder"
            element={
              <PrivateRoute>
                <Layout><MoeBuilder projectId="686350095b2ccf322e557dfb" /></Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

