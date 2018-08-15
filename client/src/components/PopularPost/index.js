import React from "react";
import { Link } from "react-router-dom";

import category from "../../category";

const PopularPost = ({ data, rank }) => {
  const {
    title,
    description,
    _id,
    author_username,
    category: category_id
  } = data;

  const category_name = category[category_id];

  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="ranking">{rank}</div>
        <div className="post-data">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div className="info">
            Author {author_username} in {category_name}
          </div>
          <div className="date">Jul 2</div>
        </div>
      </div>
    </Link>
  );
};

export default PopularPost;
