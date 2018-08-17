import React from "react";
import { Link } from "react-router-dom";

import Post from "../Post";
import PopularPost from "../PopularPost";
import category from "../../category.js";

import "./index.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
      recent: [],
      popular: []
    };
  }
  componentDidMount() {
    Promise.all(this.generatePromises())
      .then(response => Promise.all(response.map(response => response.json())))
      .then(response => {
        const [recent, featured, popular] = response;
        this.setState({
          recent,
          featured,
          popular
        });
      });
  }

  generatePromises = () => {
    const recentURL = "/post/limit/20";
    const featuredURL = "/featured/limit/7";
    const popularURL = "/popular";

    const urlArray = [recentURL, featuredURL, popularURL];
    return urlArray.map(url => fetch(url));
  };

  render() {
    const { recent, featured, popular } = this.state;

    const CategoryButtons = Object.keys(category).map(e => {
      return (
        <Link to={`/category/${e}`} key={e}>
          <div className="category-name">{category[e]}</div>
        </Link>
      );
    });

    const FeaturedPostList = featured.map(e => {
      return <Post data={e} key={e._id} />;
    });

    const RecentPostList = recent.map((e, i) => {
      return <Post data={e} key={e._id} />;
    });

    const PopularPostList = popular.map((e, i) => {
      return <PopularPost data={e} key={e._id} rank={i + 1} />;
    });

    return (
      <React.Fragment>
        <div className="categories">{CategoryButtons}</div>
        <div className="featured">
          <div className="featured-cols big-size">{FeaturedPostList[0]}</div>
          <div className="featured-cols small-size">
            {FeaturedPostList.slice(1, 4)}
          </div>
          <div className="featured-cols small-size small-hidden">
            {FeaturedPostList.slice(4, 7)}
          </div>
        </div>
        <div className="featured-button">
          <Link to="/featured">See all featured </Link>
        </div>
        <section>
          <div className="section-main">{RecentPostList}</div>
          <div className="section-side">
            <div className="popular-col">
              <div className="col-title title">Popular posts</div>
              <div className="col-details">{PopularPostList}</div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Main;
