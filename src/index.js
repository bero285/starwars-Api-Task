import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Card from "./Card";
import InfoCard from "./InfoCard";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/star-wars-Api-Task/"
        element={<Navigate to="/star-wars-Api-Task/home/1" />}
      />

      <Route path="/star-wars-Api-Task/home/:id" element={<App />} />

      <Route path="/star-wars-Api-Task/about/:id" element={<InfoCard />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
