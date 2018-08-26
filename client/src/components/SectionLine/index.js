import React from "react";
import { Link } from "react-router-dom";

import category from "../../category";

import "./index.css";

const SectionLine = props => {
  const path = props.location.pathname;
  const pathArray = path.split("/");
  const firstEndPoint = pathArray[1];
  const secondEndPoint = pathArray[2];
  const lastEndPoint = pathArray[3];

  // Ex: path = "/profile", firstEndPoint = "profile"
  // Ex: path = "/category/politics", secondEndPoint ="politics"
  // Ex: path = "/post/:id/edit", lastEndPoint ="edit"

  const isAtProfile = firstEndPoint === "profile";

  let title = "";
  switch (firstEndPoint) {
    case "profile":
      title = "My Posts";
      break;
    case "featured":
      title = "Featured Posts";
      break;
    case "category":
      title = category[secondEndPoint];
      break;
    case "post":
      if (lastEndPoint === "edit") {
        title = "Edit Post";
      } else if (secondEndPoint === "new") {
        title = "New Post";
      } else {
        title = "View Post";
      }
      break;
    default:
      title = "";
      break;
  }

  return (
    title && (
      <div className="section-line">
        <div className="section-title">{title}</div>
        {isAtProfile && (
          <Link className="link-button" to="/post/new">
            <button>New post</button>
          </Link>
        )}
      </div>
    )
  );
};

export default SectionLine;
