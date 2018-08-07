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
    const { title, description, content, _id } = this.state.data;

    return (
      <div className="displayer">
        <div className="post-header">
          <div>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
          <div className="header-icons">
            <div className="edit">
              <Link to={`/edit/${_id}`}>
                <i className="fa fa-edit" />
              </Link>
            </div>
            <div className="delete">
              <Link to={`/simple-blog`}>
                <i className="fa fa-trash" onClick={this.handleDelete} />
              </Link>
            </div>
          </div>
        </div>
        <div className="post-img">
          {/* <img src={images[`${_id}.png`]} alt="" /> */}
        </div>
        <div className="content">{content}</div>
      </div>
    );
  }
}

export default Displayer;
