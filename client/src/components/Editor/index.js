import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import category from "../../category";

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
      const url = `/post/${id}`;

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

  imagePreviewerHandler = event => {
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

  handleSubmit = () => {
    const { redirect, _id, imagePreviewer, ...data } = this.state;
    const action = this.props.action;

    const postURL = `/post`;
    const editURL = `/post/${_id}`;

    const formData = new FormData();
    for (let field in data) {
      formData.append(field, data[field]);
    }

    //HANDLE EDIT ACTION ------------------
    if (action === "edit") {
      fetch(editURL, {
        method: "PUT",
        body: formData
      })
        .then(res => res.json())
        .then(res => {
          if (Object.keys(res).length > 0)
            this.setState({
              _id: res._id,
              redirect: true
            });
        });
    }

    //HANDLE 'CREATE NEW' ACTION ------------------
    if (action === "add") {
      fetch(postURL, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(res => {
          if (Object.keys(res).length > 0)
            this.setState({
              _id: res._id,
              redirect: true
            });
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
      image_url,
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

    const canBeSubmitted = title && description && content;

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
                  this.imagePreviewerHandler(e);
                }}
                className="filetype"
                id="group_image"
              />
            </div>
          </div>
          <div className="image_previewer">
            <img
              id="target"
              src={imagePreviewer ? imagePreviewer : image_url}
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
          <button
            disabled={!canBeSubmitted}
            className={canBeSubmitted ? "submit" : "submit disabled"}
            onClick={this.handleSubmit}
          >
            Save
          </button>
          <button onClick={history.goBack}>Cancel</button>
        </div>
        {redirect && <Redirect to={`/post/${_id}`} />}
      </div>
    );
  }
}

export default Editor;
