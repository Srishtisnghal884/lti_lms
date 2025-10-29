import React from "react";
import LandingLayoutPage from "../../Components/LandingPageLayout";
import "./profile.css";
import { Avatar } from "@mui/material";
import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";

const ProfilePage = () => {
  const localData = getUserDataFromLocalStorage();
  
  return (
    <>
      <LandingLayoutPage>
        <div className="app-container">
          <div className="profile-card"> 
            <Avatar
              className="profile-img"
              sx={{ bgcolor: "#ff9800", fontSize: "3.25rem !important" }}
            > 
              {localData?.name?.split("")[0]}
            </Avatar>

            <div className="profile-content">
              <h2 className="name">{localData?.name}</h2> 
              <p className="title">{localData?.email}</p>
              <p className="title">{localData?.['role.name']}</p>
              <p className="title">Country : India</p>
              <div style={{display: 'flex', width: '100%'}}>
                <div className="" style={{ width: '50%'}}>
                  <p className="title">
                    Start date 
                  </p>
                  <span>{new Date(localData?.created_date_time).toLocaleDateString()}</span> 
                </div>
                <div className="" style={{ width: '50%'}}>
                  <p className="title">
                    End date 
                  </p>
                  <span>{new Date(localData?.modified_date_time).toLocaleDateString()}</span> 
                </div>
              </div> 
            </div>
          </div>
        </div>
      </LandingLayoutPage>
    </>
  );
};

export default ProfilePage;
