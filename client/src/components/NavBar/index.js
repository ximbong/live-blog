import React from "react";
import { Link } from "react-router-dom";

import MainIcon from "../../assets/main-icon.png";
import ProfilePic from "../../assets/profile-pic.png";

import "./index.css";

const NavBar = props => {
  const location = props.location.pathname;

  const LeftNavButton =
    location === "/" ? (
      <Link to="/post/new">
        <button>New post</button>
      </Link>
    ) : (
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    );

  const AvatarDropdown = (
    <div className="avatar-dropdown">
      <Link className="profile" to="/profile">
        <div className="button--view-post">My posts</div>
      </Link>
      <div className="button--edit-profile">Edit Profile</div>
      <div onClick={props.handleLogOut} className="button--logout">
        Log out
      </div>
    </div>
  );

  const Nav = (
    <nav>
      {LeftNavButton}
      <Link to="/">
        <img src={MainIcon} alt="main-logo" className="main-logo" />
      </Link>
      <div className="avatar">
        <Link className="profile" to="/profile">
          <img src={ProfilePic} alt="profile-pic" className="profile-img" />
        </Link>
        {AvatarDropdown}
      </div>
    </nav>
  );

  const displayNav = location !== "/login";

  return displayNav && Nav;
};

export default NavBar;
