import React from "react";
import { Link } from "react-router-dom";

import category from "../../category";

const Post = props => {
  const {
    title,
    description,
    _id,
    author_id,
    category: category_id
  } = props.data;

  const category_name = category[category_id];

  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="post-img">
          {/* <img src={images[`${_id}.png`]} alt="" /> */}
        </div>
        <div className="post-data">
          <div>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
          <div>
            <div className="info">
              Author {author_id} in {category_name}
            </div>
            <div className="date">Jul 2</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
