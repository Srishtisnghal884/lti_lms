import { useState } from "react";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import "./index.css";
import { logout } from "../../Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";

const LandingLayoutPage = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false); 
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerClass = openDrawer ? "open" : "closed";

  const handleLogout = () => { 
    window.location.replace('/')
     dispatch(logout());
  };
 
  return (
    <>
      <div className="employability-page">
        {children}
        <div className="sidebar-right">
          <div
            className="menu-icon-placeholder"
            onClick={() => handleOpenDrawer()}
          >
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </div>
        </div> 
        <div className={`drawer-container ${drawerClass}`}>
          <div onClick={() => setOpenDrawer(false)} class="crossIconContainer">
            <ClearIcon
              fontSize="medium"
              sx={{ marginTop: "6px", fontWeight: "bold" }}
            />
          </div>
          <ul class="text-center fs-1" id="menulist">
            {/* <li>
              <Link
                to={"/dashboard/employability"}>
                Home
              </Link>
            </li> */}
            <li>
              <Link to={"/dashboard/results"}>Result</Link>
            </li>
            <li>
              <Link to={"/user-profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/help"}>Help</Link>
            </li>
            {/* <li onClick={handleLogout}>Logout</li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
export default LandingLayoutPage;
