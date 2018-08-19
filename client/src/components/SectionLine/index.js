import React from "react";
import { Link } from "react-router-dom";

import category from "../../category";

import "./index.css";

const SectionLine = props => {
  const path = props.location.pathname;
  const higherEndPoint = path.split("/")[1];
  const lowerEndPoint = path.split("/")[2];

  // Ex: path = "/new", higherEndPoint = "new"
  // Ex: path = "/category/politics", higherEndPoint = "category", lowerEndPoint ="politics"

  let title = "";
  switch (higherEndPoint) {
    case "new":
      title = "New Post";
      break;
    case "profile":
      title = "My Posts";
      break;
    case "post":
      title = "View Post";
      break;
    case "featured":
      title = "Featured Posts";
      break;
    case "edit":
      title = "Edit Post";
      break;
    case "category":
      title = category[lowerEndPoint];
      break;
    default:
      title = "";
      break;
  }

  return (
    title && (
      <div className="section-line">
        <div className="section-title">{title}</div>
        {higherEndPoint === "profile" && (
          <Link className="link-button" to="/new">
            <button>New post</button>
          </Link>
        )}
      </div>
    )
  );
};

export default SectionLine;
