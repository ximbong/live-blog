import React, { Component } from "react";

import Post from "../Post";

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const url = `/featured`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
      });
  }
  render() {
    const { data } = this.state;

    const PostList = data.map(e => {
      return <Post data={e} key={e._id} />;
    });

    return <div className="my-posts">{PostList}</div>;
  }
}

export default Featured;
