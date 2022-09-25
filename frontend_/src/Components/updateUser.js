import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Api from "./Utils/ApiConfig";
import axios from "axios";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class UpdateUser extends Component {
  emptyItem = {
    name: "",
    email: "",
  };
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let { id } = this.props.params;
    this.fetchData(id);
  }

  fetchData = (id) => {
    const url = Api.api + `/clients/${id}`;
    // const paras = { answer: 42 ,huy:2}
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({ id: response.data.id });
        this.setState({
          item: {
            ...this.state.item,
            name: response.data.name,
            email: response.data.email,
          },
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  async handleSubmit(e) {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    const id = data.id;
    let item = this.state.item;
    const client = JSON.stringify(item);
    console.log(client);
    const url = Api.api + `/clients/${id}`;

    await axios.put(url, client, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
        alert("chinhr thanh cong")
        // this.setState({
        //     item: {
        //       ...this.state.item,
        //       name: response.data.name,
        //       email: response.data.email,
        //     },
        //   });
      });;
  }
  handleChange(e) {
    const target = e.target;
    const name = target.id;
    const value = target.value;
    if (name === "name") {
      this.setState({
        item: {
          ...this.state.item,
          name: value,
        },
      });
    } else {
      this.setState({
        item: {
          ...this.state.item,
          email: value,
        },
      });
    }
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        <Link to={"/clients"}>Xem tat ca thanh vien</Link>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Id" className="form-label">
              Id
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              id="Id"
              aria-describedby="emailHelp"
              value={this.state.id}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={item.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              id="email"
              value={item.email}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withParams(UpdateUser);
