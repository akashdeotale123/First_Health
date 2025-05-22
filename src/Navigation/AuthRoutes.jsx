import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomeCards from "../Components/Home/Home";
import SearchBatch from "../Components/Batch/SearchBatch";
import SearchClaim from "../Components/Claim/SearchClaim";
import SearchPatient from "../Components/Patient/SearchPatient";
import SearchProvider from "../Components/Provider/SearchProvider";
import Signup from "../Components/Auth/Signup";
import Login from "../Components/Auth/Login";
import MainFooter from "../Components/Footer/MainFooter";
import MainNaveBar from "../Components/Navebar/MainNaveBar";
import SubNaveBar from "../Components/Navebar/SubNaveBar";

const AuthRoutes = () => {
  const [isAuthIn, setIsAuthIn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthIn(!!token);
  }, [pathname]);

  if (!isAuthIn) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <MainNaveBar />
      <SubNaveBar />
      <Routes>
        <Route path="/" element={<HomeCards />} />
        <Route path="/mcpsweb/searchbatch" element={<SearchBatch />} />
        <Route path="/mcpsweb/searchclaim" element={<SearchClaim />} />
        <Route path="/mcpsweb/searchpatient" element={<SearchPatient />} />
        <Route path="/mcpsweb/searchprovider" element={<SearchProvider />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MainFooter />
    </>
  );
};

export default AuthRoutes;
