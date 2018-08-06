import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import importAll from "../../handler";
import category from "../../category";
import { baseURL } from "../../baseURL";

import "./index.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      description: "",
      content: "",
      image_url: "",
      category: "future_human",
      redirect: false,
      imagePreviewer: null
    };
  }

  componentDidMount() {
    if (this.props.action === "edit") {
      const id = this.props.match.params.id;
      const url = `${baseURL}/post/${id}`;

      fetch(url)
        .then(res => res.json())
        .then(res =>
          this.setState({
            _id: res._id,
            title: res.title,
            description: res.description,
            content: res.content,
            image_url: res.image_url,
            category: res.category
          })
        );
    }
  }

  handle = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  imagePreviewer = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ imagePreviewer: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  fileChangedHandler = event => {
    this.setState({ image_url: event.target.files[0] });
  };

  fetchImage = (_id, url, image_url) => {
    const formData = new FormData();

    formData.append("_id", _id);
    formData.append("image_url", image_url);

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          _id: res._id,
          redirect: true
        });
      });
  };

  handleSubmit = () => {
    const { redirect, _id, image, image_url, ...data } = this.state;

    const uploadURL = `${baseURL}/upload`;
    const postURL = `${baseURL}/post`;
    const editURL = `${baseURL}/post/${_id}`;

    const action = this.props.action;

    //HANDLE EDIT ACTION ------------------
    if (action === "edit") {
      fetch(editURL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          if (Object.keys(res).length > 0)
            this.setState({
              redirect: true
            });
        });

      this.fetchImage(_id, uploadURL, image_url);
    }

    //HANDLE 'CREATE NEW' ACTION ------------------
    if (action === "add") {
      fetch(postURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          const _id = res._id;
          return this.fetchImage(_id, uploadURL, image_url);
        });
    }
  };

  render() {
    const {
      _id,
      title,
      description,
      content,
      category: category_name,
      redirect,
      imagePreviewer
    } = this.state;
    const { history } = this.props;

    const optionlist = Object.keys(category).map(e => {
      return (
        <option value={e} key={e}>
          {category[e]}
        </option>
      );
    });

    const images = importAll(
      require.context("../../../../simple-blog-backend/upload/", false, /.png/)
    );

    return (
      <div className="editor">
        <div className="inputs">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => this.handle(e, "title")}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={e => this.handle(e, "description")}
            />
            <div className="select_image">
              <select
                value={category_name}
                onChange={e => this.handle(e, "category")}
              >
                {optionlist}
              </select>
              <input
                type="file"
                onChange={e => {
                  this.fileChangedHandler(e);
                  this.imagePreviewer(e);
                }}
                className="filetype"
                id="group_image"
              />
            </div>
          </div>
          <div className="image_previewer">
            <img
              id="target"
              src={imagePreviewer ? imagePreviewer : images[`${_id}.png`]}
              alt=""
            />
          </div>
        </div>
        <textarea
          name="name"
          placeholder="Content"
          value={content}
          onChange={e => this.handle(e, "content")}
        />
        <div className="buttons">
          <button onClick={this.handleSubmit}>Save</button>
          <button onClick={history.goBack}>Cancel</button>
        </div>
        {redirect && <Redirect to={`/post/${_id}`} />}
      </div>
    );
  }
}

export default Editor;
