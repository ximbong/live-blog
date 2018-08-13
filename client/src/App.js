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
import Loader from "./components/Loader";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loader: true,
      username: ""
    };
  }

  componentDidMount = () => {
    this.checkAuth();
  };

  //submit (register/login) state is checked in loginForm
  handleLogIn = username => {
    this.setState({
      authenticated: true,
      username
    });
  };

  handleLogOut = () => {
    fetch("/logout")
      .then(res => res.text())
      .then(res => {
        if (res === "true") {
          this.setState({
            authenticated: false
          });
        }
      });
  };

  checkAuth = () => {
    fetch("/auth")
      .then(res => res.text())
      .then(res => {
        setTimeout(() => {
          const isAuthenticated = res === "true"; //res is a string
          this.setState({
            authenticated: isAuthenticated,
            loader: false
          });
        }, 2000);
      });
  };

  render() {
    const { authenticated, loader, username } = this.state;

    const Routes = (
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              path="/login"
              render={() => <LoginForm handleLogIn={this.handleLogIn} />}
            />
            {!authenticated && !loader && <Redirect to="/login" />}
          </Switch>
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
          <Route
            path="/post/:id"
            render={props => <Displayer {...props} username={username} />}
          />

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
        </React.Fragment>
      </Router>
    );

    return loader ? <Loader /> : Routes;
  }
}

export default App;
