import React from "react";
import { createRoot } from "react-dom/client";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
