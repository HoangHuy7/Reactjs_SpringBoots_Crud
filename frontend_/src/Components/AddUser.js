import React, { Component } from "react";
import axios from "axios";
import Api from "./Utils/ApiConfig";
import { Link } from "react-router-dom";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    console.log(this.state);
    const url = Api.api + "/clients";
    const data = this.state;
    if (data.name != null && data.email != null) {
      axios
        .post(url, {
          name: data.name,
          email: data.email,
        })
        .then(function (response) {
          console.log(response);
          alert("theem thanh cong");
        
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("vui long  nhap day du thong tin");
    }
    e.preventDefault();
  }
  handleChange(e) {
    const type = e.target.type;
    if (type === "text") {
      this.setState({
        name: e.target.value,
      });
    } else {
      this.setState({
        email: e.target.value,
      });
    }
  }
  render() {
    return (
      <>
        <Link to={"/clients"}>Xem tat ca thanh vien</Link>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputPassword1"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          
        </form>
      </>
    );
  }
}
