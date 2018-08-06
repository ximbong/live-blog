import React from "react";
import { Link } from "react-router-dom";

import category from "../../category";

import "./index.css";

const SectionLine = props => {
  let title = "";

  switch (props.action) {
    case "add":
      title = "New Post";
      break;
    case "view_list":
      title = "My Posts";
      break;
    case "view":
      title = "My Post";
      break;
    case "view_category":
      const name = props.match.params.name;
      title = category[name];
      break;
    case "view_featured":
      title = "Featured Posts";
      break;
    default:
      title = "Edit Post";
  }

  return (
    <div className="section-line">
      <a className="section-title">{title}</a>
      {props.action === "view_list" && (
        <Link className="link-button" to="/new">
          <button>New post</button>
        </Link>
      )}
    </div>
  );
};

export default SectionLine;
