import React from "react";
import { Link } from "react-router-dom";

import Post from "../Post";
import category from "../../category.js";
import { baseURL } from "../../baseURL";

import "./index.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featured_posts: [],
      all_posts: []
    };
  }
  componentDidMount() {
    const dataURL = `${baseURL}/main`;

    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        if (res) {
          const all_posts = res;
          const featured_posts = res.filter(e => e.featured === true);
          this.setState({
            featured_posts: featured_posts,
            all_posts: all_posts
          });
        }
      });
  }

  render() {
    const { featured_posts, all_posts } = this.state;

    const CategoryButtons = Object.keys(category).map(e => {
      return (
        <Link to={`/category/${e}`} key={e}>
          <div className="category-name">{category[e]}</div>
        </Link>
      );
    });

    const FeaturedPostList = featured_posts.map(e => {
      return <Post data={e} key={e._id} />;
    });

    const PostList = all_posts.map((e, i) => {
      return <Post data={all_posts[i]} key={e._id} />;
    });

    const FirstColumnPost = FeaturedPostList[0];
    const SecondColumnPost = FeaturedPostList.slice(1, 4);
    const ThirdColumnPost = FeaturedPostList.slice(4, 7);

    return (
      <React.Fragment>
        <div className="categories">{CategoryButtons}</div>
        <div className="featured">
          <div className="featured-cols big-size">{FirstColumnPost}</div>
          <div className="featured-cols small-size">{SecondColumnPost}</div>
          <div className="featured-cols small-size small-hidden">
            {ThirdColumnPost}
          </div>
        </div>
        <div className="featured-button">
          <Link to="/featured">See all featured </Link>
        </div>

        <section>
          <div className="section-main">{PostList}</div>
          <div className="section-side">
            <div className="popular-col">
              <div className="col-title title">Popular posts</div>
              <div className="col-details">
                <div className="post">
                  <div className="ranking">01</div>
                  <div className="post-data">
                    <div className="title">The Gloves We'll Wear on Mars</div>
                    <div className="description">
                      The ultimate evening routine for cutting stress, creating
                      momentum, and cultivating happiness
                    </div>
                    <div className="info">Author name in Category name</div>
                    <div className="date">Jul 2</div>
                  </div>
                </div>
                <div className="post">
                  <div className="ranking">02</div>
                  <div className="post-data">
                    <div className="title">The Gloves We'll Wear on Mars</div>
                    <div className="description">
                      The ultimate evening routine for cutting stress, creating
                      momentum, and cultivating happiness
                    </div>
                    <div className="info">Author name in Category name</div>
                    <div className="date">Jul 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Main;
