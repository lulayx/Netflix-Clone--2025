import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/images/netflix-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import profile from "../../assets/images/profile_img.png";



function Header() {
  const [show, setShow] = useState(false); // start with menu closed. 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  return (
    <div className={`header ${show && "header__black"}`}>
      <div className="header__container">
        <div className="header__left">
          <ul className="header__nav">
            <li>
              <img src={logo} alt="netflix-logo" />
            </li>
            <li className="header__active">Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="header__right">
          <ul className="header__nav">
            <li><SearchIcon /></li>
            
             

            <li>
              <p>kids</p>
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
         
            <li>
              <img
                className="header__profile"
                src={profile}
                alt="profile img"
              />

            
              <ArrowDropDownIcon />  
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
