import React, { Component } from "react";

import Post from "../Post";

import "./index.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const url = `/profile`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      );
  }

  render() {
    const PostList = this.state.data.map(e => {
      return <Post data={e} key={e._id} />;
    });

    return <div className="my-posts">{PostList}</div>;
  }
}

export default Profile;
