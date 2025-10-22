import React from "react";
import LandingLayoutPage from "../../Components/LandingPageLayout";
import "./profile.css";
import { Avatar } from "@mui/material";
import { getAuthDataFromLocalStorage } from "../../common/getDataFromLocal";

const ProfilePage = () => {
  const localData = getAuthDataFromLocalStorage();

  return (
    <>
      <LandingLayoutPage>
        <div className="app-container">
          <div className="profile-card">
            <div className="profile-banner"></div>
            <Avatar
              className="profile-img"
              sx={{ bgcolor: "#ff9800", fontSize: "3.25rem !important" }}
            >
              {" "}
              {localData.username.split("")[0]}
            </Avatar>

            <div className="profile-content">
              <h2 className="name">{localData.access.name}</h2>

              <p className="title">{localData.username}</p>
              <p className="title">Country : India</p>
              <p className="title">{localData.access.role}</p>
              <div className="buttons">
                <button
                  // onClick={() => handleButtonClick("Message")}
                  className="btn primary"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </LandingLayoutPage>
    </>
  );
};

export default ProfilePage;
