import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";

import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
