import React, { Component } from "react";

import Post from "../Post";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const name = this.props.match.params.name;

    fetch(`/category/${name}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      );
  }

  render() {
    const { data } = this.state;

    const PostList = data.map(e => {
      return <Post data={e} key={e._id} />;
    });

    const displayInfo =
      data.length === 0 ? "There's nothing in this category" : PostList;

    return <div className="my-posts">{displayInfo}</div>;
  }
}

export default Category;
