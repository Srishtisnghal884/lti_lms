import React from "react";
import "./Employability.css";
import { getAuthDataFromLocalStorage } from "../common/getDataFromLocal";
import { Link } from "react-router-dom"; 
import LandingPageLayout from "../Components/LandingPageLayout";

const EmployabilityAdvantagePage = () => {
  const localData = getAuthDataFromLocalStorage();

  return (
    <>
    <LandingPageLayout>  
      <div class="Content-container">
        <div id="menu-and-logo-container">
          <div className="header-logo">
            <img src="/ECAIcon.png" alt="logo" width={"30px"} height={"30px"} />{" "}
             Employability{" "}
            <span className="logo-accent">
              {" "}
              <br />
              Advantage
            </span>
          </div> 
        </div>
        <div id="heading-para-video">
          <h1 className="welcome-heading">
            Let's get started,{" "}
            <span className="user-name">
              {localData.username.split("@")[0]}{" "}
            </span>
          </h1>
          <div class="para-video-section text-light">
            <div className="text-section">
              <section class="para-head-1">
                <span className="bold-headings">
                  We're really glad you're here.
                </span>
                <p>
                  Employability Advantage is a one stop solution. From testing
                  your skills, to growing your skill base and getting set for
                  interviews, get it all done in one place.
                </p>
              </section>
              <section class="para-head-2">
                <span class="bold-headings lh-1">
                  Watch our, " How it works"
                  <br />
                  video, then test your skills.
                </span>
                <p>
                  Once you get your results, think about building your skill
                  base. Employability Advantage takes the difficulty out with
                  curated learning paths to help you build the right skills.
                </p>
              </section> 
              <div className="next-button">
                <Link to={"/career-choice"}>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div class="video-section">
              <div class="video-container" id="video-container">
                <video
                  src="https://uploadmlj.pieinfosystems.com/upload/quick-start-guide-video-0.mp4"
                  id="quickGuideVideo"
                  controls
                  autoplay=""
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </LandingPageLayout>
    </>
  );
};

export default EmployabilityAdvantagePage;