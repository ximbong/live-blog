import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import NavBar from "./components/NavBar";
import SectionLine from "./components/SectionLine";
import Editor from "./components/Editor";
import Displayer from "./components/Displayer";
import Profile from "./components/Profile";
import Main from "./components/Main";
import Category from "./components/Category";
import Featured from "./components/Featured";
import LoginForm from "./components/LoginForm";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentDidMount = () => {
    fetch("/auth")
      .then(res => res.json())
      .then(res => {
        this.setState({
          authenticated: res
        });
      });
  };

  toggleAuth = () => {
    this.setState({
      authenticated: !this.state.authenticated
    });
  };

  handleLogOut = () => {
    fetch("/logout")
      .then(res => res.text())
      .then(res => {
        this.setState({
          authenticated: false
        });
      });
  };

  checkAuth = () => {
    fetch("/auth")
      .then(res => res.json())
      .then(res => {
        this.setState({
          authenticated: res
        });
      });
  };

  render() {
    const { authenticated } = this.state;

    console.log(authenticated);

    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar {...props} handleLogOut={this.handleLogOut} />
            )}
          />
          <Route path="/simple-blog" exact={true} render={() => <Main />} />

          <Route path="/new" render={() => <SectionLine action="add" />} />
          <Route
            path="/new"
            render={props => <Editor action="add" {...props} />}
          />

          <Route
            path="/post/:id"
            render={() => <SectionLine action="view" />}
          />
          <Route path="/post/:id" render={props => <Displayer {...props} />} />

          <Route
            path="/edit/:id"
            render={() => <SectionLine action="edit" />}
          />
          <Route
            path="/edit/:id"
            render={props => <Editor action="edit" {...props} />}
          />

          <Route
            path="/profile"
            render={() => <SectionLine action="view_list" />}
          />
          <Route path="/profile" render={() => <Profile />} />

          <Route
            path="/category/:name"
            render={props => <SectionLine action="view_category" {...props} />}
          />
          <Route
            path="/category/:name"
            render={props => <Category {...props} />}
          />

          <Route
            path="/featured"
            render={() => <SectionLine action="view_featured" />}
          />
          <Route path="/featured" render={() => <Featured />} />
          <Switch>
            <Route
              path="/login"
              render={() => <LoginForm toggleAuth={this.toggleAuth} />}
            />
            {!authenticated && <Redirect to="/login" />}
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
