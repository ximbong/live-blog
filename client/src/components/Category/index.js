import React, { Component } from "react";

import Post from "../Post";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: true
    };
  }
  componentDidMount() {
    const name = this.props.match.params.name;

    fetch(`/category/${name}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res,
          fetching: false
        })
      );
  }

  render() {
    const { data, fetching } = this.state;

    const PostList = data.map(e => {
      return <Post data={e} key={e._id} />;
    });

    const displayInfo =
      !fetching && data.length === 0
        ? "There's nothing in this category"
        : PostList;

    return <div className="my-posts">{displayInfo}</div>;
  }
}

export default Category;
