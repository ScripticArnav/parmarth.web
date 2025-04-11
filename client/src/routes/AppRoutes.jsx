import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About/About";
import Classes from "../pages/Classes/Classes";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import RequestForCertificate from "../pages/RequestForCertifcate/RequestForCertificate";
import Schooling from "../pages/Schooling/Schooling";
import RequestReceived from "../pages/RequestReceived/RequestReceived";
import AuthContext from "../store/auth-context";
import AddRteData from "../pages/AddRteData/AddRteData";
import RteData from "../pages/RteData/RteData";
import Volunteers from "../pages/VolunteersData/Volunteers";
import Udgam from "../pages/Udgam/Udgam.jsx"
import SocialService from "../pages/SocialService/SocialService.jsx"
import Utsarg from "../pages/Utsarg/Utsarg.jsx"
import Utsaah from "../pages/Utsaah/Utsaah.jsx"
import Unnayan from "../pages/Unnayan/Unnayan.jsx"
import Ummeed from "../pages/Ummeed/Ummeed.jsx"
import EduVisit from "../pages/EduVisit/EduVisit.jsx"
import BloodDonation from "../pages/BloodDonation/BloodDonation.jsx"
import Team from "../pages/Team/Team";
import Constitution from "../pages/Constitution/Constitution";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import ListPost from "../pages/ListPosts/ListPosts";
import Post from "../pages/Post/Post";
import AddVolunteerData from "../pages/AddVolunteerData/AddVolunteerData";
import Events from "../pages/Events/Events";
import CreateUser from "../pages/CreateUser/CreateUser";
import ListUsers from "../pages/ListUsers/ListUsers";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
import backendUrl from "../backendUrl";
import toast from "react-hot-toast";
import Muskan from "../pages/Muskan/Muskan.jsx";
import GE from "../pages/GE/GE.jsx";
import Article from "../pages/Article/Article.jsx";
import ConvertUrl from "../pages/ConvertUrl/ConvertUrl";
import AddEventVolunteersData from "../pages/AddEventVolunteersData/AddEventVolunteersData";
import EventVolunteersData from "../pages/EventVolunteersData/EventVolunteersData";
import UtsavAyojan from "../pages/UtsavAyojan/UtsaavAyojan.jsx";
import DonationForm from "../pages/Forms/DonationForm.jsx"; // Add this import
import BecomeSponsor from "../pages/Forms/BecomeSponsor.jsx"; // Add this import
import HealthCareForm from "../pages/Forms/HealthCareForm.jsx";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const userId = localStorage.getItem("userId");
      (async () => {
        await fetch(`${backendUrl}/getUserType/${userId}`)
          .then((res) => res.json())
          .then((resData) => {
            authCtx.fillUserType(resData.userType);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })();
    }
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
      {!authCtx.isLoggedIn && (
        <Route path="/verify-code" element={<VerifyCode />} />
      )}
      <Route path="/about" element={<About />} />
      <Route path="/DonationForm" element={<DonationForm />} />
      <Route path="/BecomeSponsor" element={<BecomeSponsor />} />
      <Route path="/HealthCareForm" element={<HealthCareForm />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/team" element={<Team />} />
      <Route path="/udgam" element={<Udgam />} />
      <Route path="/socialservice" element={<SocialService />} />
      <Route path="/utsarg" element={<Utsarg />} />
      <Route path="/utsaah" element={<Utsaah />} />
      <Route path="/unnayan" element={<Unnayan />} />
      <Route path="/ummeed" element={<Ummeed />} />
      <Route path="/utsav" element={<UtsavAyojan />} />
      <Route path="/eduvisit" element={<EduVisit />} />
      <Route path="/blooddonation" element={<BloodDonation />} />
      <Route path="/muskan" element={<Muskan />} />
      <Route path="/ge" element={<GE />} />
      <Route path="/schooling" element={<Schooling />} />
      <Route path="/events" element={<Events />} />
      <Route path="/article" element={<Article />} />
      <Route path="/constitution" element={<Constitution />} />
      {/* {authCtx.isLoggedIn && (
        <Route path="/convert-url" element={<ConvertUrl />} />
      )} */}
      <Route
        path="/request-for-certificate"
        element={<RequestForCertificate />}
      />
      <Route path="/rte-data" element={<RteData />} />
      <Route path="/rte-data/:academicYear" element={<RteData />} />
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "media") && (
          <Route path="/add-rte-data" element={<AddRteData />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "media") && (
          <Route path="/create-post" element={<CreatePost />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media" ||
          userType === "teachers") && (
          <Route path="/edit-post/:id" element={<EditPost />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media" ||
          userType === "teachers") && (
          <Route path="/list-posts" element={<ListPost />} />
        )}
      <Route path="/:category/:id" element={<Post />} />
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route path="/request-received" element={<RequestReceived />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route path="/volunteers-data" element={<Volunteers />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media") && (
          <Route path="/add-volunteer-data" element={<AddVolunteerData />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route
            path="/event-volunteers-data"
            element={<EventVolunteersData />}
          />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media") && (
          <Route
            path="/add-event-volunteers-data"
            element={<AddEventVolunteersData />}
          />
        )}
      {authCtx.isLoggedIn && userType === "master" && (
        <Route path="/create-user" element={<CreateUser />} />
      )}
      {authCtx.isLoggedIn && userType === "master" && (
        <Route path="/list-users" element={<ListUsers />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
