import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Borhan from "./pages/Borhan";
import ChoosePlan from "./pages/Investment Funding/ChoosePlan";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Tradehistory from "./pages/TradeHistory/Tradehistory";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="/borhan" element={<Borhan />} />
          <Route path="/chosePlan" element={<ChoosePlan />} />
          <Route path="/trade-history" element={<Tradehistory />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <ToastContainer theme="dark" position="top-left" autoClose={3000} />
    </>
  );
}

export default App;
