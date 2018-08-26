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
      loader: true,
      username: null
    };
  }

  componentDidMount = () => {
    this.checkAuth();
  };

  handleLogIn = username => {
    this.setState({
      username
    });
  };

  handleLogOut = () => {
    fetch("/logout")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          username: res.username
        });
      });
  };

  checkAuth = () => {
    fetch("/auth")
      .then(res => res.json())
      .then(res => {
        setTimeout(() => {
          this.setState({
            username: res.username,
            loader: false
          });
        }, 2000);
      });
  };

  render() {
    const { loader, username } = this.state;

    const Routes = (
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              path="/login"
              render={() => <LoginForm handleLogIn={this.handleLogIn} />}
            />
            {!username && !loader && <Redirect to="/login" />}
          </Switch>

          <Route
            path="/"
            render={props => (
              <NavBar {...props} handleLogOut={this.handleLogOut} />
            )}
          />
          <Route path="/" render={props => <SectionLine {...props} />} />
          <Route path="/" exact render={() => <Main />} />

          <Switch>
            <Route
              path="/post/new"
              render={props => <Editor action="add" {...props} />}
            />
            <Route
              exact
              path="/post/:id"
              render={props => <Displayer {...props} username={username} />}
            />
            <Route
              path="/post/:id/edit"
              render={props => <Editor action="edit" {...props} />}
            />
          </Switch>

          <Route path="/profile" render={() => <Profile />} />
          <Route
            path="/category/:name"
            render={props => <Category {...props} />}
          />
          <Route path="/featured" render={() => <Featured />} />
        </React.Fragment>
      </Router>
    );

    return loader ? <Loader /> : Routes;
  }
}

export default App;
