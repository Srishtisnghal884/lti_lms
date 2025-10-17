import React, { useState } from 'react';
import './Employability.css';     
import { getAuthDataFromLocalStorage } from '../common/getDataFromLocal';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear'; 

const EmployabilityAdvantagePage = () => {
  const localData = getAuthDataFromLocalStorage()
  const [openDrawer, setOpenDrawer] = useState(false) 
  
  const handleOpenDrawer = () => {
  setOpenDrawer(!openDrawer)
  }

  const drawerClass = openDrawer ? 'open' : 'closed';

  const handleLogout = () => {
console.log("logout")
  }

  return (
    <div className='employability-page'>

    <div className="page-container"> 
      <div className="content-area">
        <div className="header-logo">
         <img src='/ECAIcon.png' alt='logo' width={"30px"} height={"30px"}/> Employability <span className="logo-accent"> <br/>Advantage</span>
        </div>
        <h1 className="welcome-heading">Let's get started,  <span className="user-name">{localData.username.split("@")[0]} </span></h1>

        <div className="text-section">
          <span className='bold-headings'>We're really glad you're here.</span>
          <p>
            **Employability Advantage** is a one stop solution. From testing your skills, to growing your skill base and getting set for interviews, get it all done in one place.
          </p>
          <span className='bold-headings'>
            Watch our, **"How it works"** video, then test your skills.
          </span>
          <p>
            Once you get your results, think about building your skill base. **Employability Advantage** takes the difficulty out with curated learning paths to help you build the right skills.
          </p>
        </div> 
        <div className="next-button">
          <Link to={"/career-choice"}>
          <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {/* --- Right Column/Visual Area --- */}
      <div className="visual-area">
        <div className="laptop-mockup"> 
          <div className="laptop-screen">
            <video src="https://uploadmlj.pieinfosystems.com/upload/quick-start-guide-video-0.mp4" id="quickGuideVideo" controls="" autoplay=""></video> 
          </div>
        </div>
      </div>  
      <div className="sidebar-right">
        <div className="menu-icon-placeholder" onClick={() => handleOpenDrawer()}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
      </div>
      { openDrawer &&  
      <div className={`drawer-container ${drawerClass}`}>
   
      <div onClick={() => setOpenDrawer(false)} class="crossIconContainer"> 
        <ClearIcon fontSize='medium' sx={{marginTop: "6px", fontWeight: "bold"}}/>
      </div>
      <ul class="text-center fs-1" id="menulist">
          <li><Link to={"/dashboard"}>Dashboard</Link></li>
          <li><Link to={"/help"}>Help</Link></li>
          <li onClick={handleLogout}>Logout</li>
      </ul> 
    </div>}
    </div>
    </div>
  );
};

export default EmployabilityAdvantagePage;