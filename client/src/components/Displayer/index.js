import React, { Component } from "react";
import { Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import "./index.css";

class Displayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const url = `/post/${id}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
      });
  }

  handleDelete = () => {
    const id = this.props.match.params.id;
    const url = `/post/${id}`;

    fetch(url, {
      method: "DELETE"
    });
  };

  render() {
    const username = this.props.username;
    const {
      title,
      description,
      content,
      _id,
      image_url,
      author_username
    } = this.state.data;

    const displaySideButtons = author_username === username;

    const sideButtons = (
      <div className="header-icons">
        <div className="edit">
          <Link to={`/post/${_id}/edit`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
        <div className="delete">
          <Link to={`/`}>
            <i className="fa fa-trash" onClick={this.handleDelete} />
          </Link>
        </div>
      </div>
    );

    return (
      <div className="displayer">
        <div className="post-header">
          <div>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
          {displaySideButtons && sideButtons}
        </div>
        <div className="displayer-img">
          <img src={image_url} alt="" />
        </div>
        <div className="content">{content}</div>
      </div>
    );
  }
}

export default Displayer;
