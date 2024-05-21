import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { HashRouter, Route, Routes } from 'react-router-dom'
import "./src/css/global.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </HashRouter>
);