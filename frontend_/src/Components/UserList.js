/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Api from "./Utils/ApiConfig";

const Button = (props) => {
  const { styles, id, event, text, obj } = props;
  return (
    <button id={id} value={obj} className={styles} key={id} onClick={event}>
      {text}
    </button>
  );
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  state = {
    users: [],
    user: null,
  };

  addUsers(users) {
    this.setState(users);
  }

  componentDidMount() {
    const url = Api.api + "/clients";
    // const paras = { answer: 42 ,huy:2}
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async handleDelete(e) {
    const id = e.target.id;
    const url = Api.api + `/clients/` + id;
    axios
      .delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        var userList = [...this.state.users].filter((a) => {
          // eslint-disable-next-line eqeqeq
          return a.id != id;
        });
        this.setState({ users: userList });
      });
  }
  async handleUpdate(e) {
    console.log(e.target);
  }

  render() {
    const styleButtonDelete = "btn btn-danger";
    const styleButtonUpdate = "btn btn-primary";
    const styleButtonAdd = "btn btn-success";
    const Users = ({ users }) => {
      const list = users.map((u) => (
        <tr key={u.id}>
          <th width="50px"></th>
          <th width="50px">{u.id}</th>
          <th width="50px"></th>
          <th width="50px">{u.name}</th>
          <th width="50px"></th>
          <th width="50px">{u.email}</th>
          <th width="50px"></th>
          <th width="50px">
            <Button
              id={u.id}
              event={this.handleDelete}
              styles={styleButtonDelete}
              text={"Delete"}
              obj={u}
            />
          </th>
          <th width="50px"></th>
          <th width="50px">
            <Link to={`/updateUser/${u.id}`}>
              <Button
                id={u.id}
                event={this.handleUpdate}
                styles={styleButtonUpdate}
                text={"Update"}
              />
            </Link>
          </th>
        </tr>
      ));
      return list;
    };
    const arr = this.state.users;
    return (
      <>
        <div className="m-4 p-2">
          <Link to={"/createUser"}>
            <Button styles={styleButtonAdd} text={"Add"} />
          </Link>
        </div>
        <table className="mt-4">
          <thead>
            <tr>
              <th width="50px"></th>
              <th width="50px">Id</th>
              <th width="50px"></th>
              <th width="50px">Name</th>
              <th width="50px"></th>
              <th width="50px">Email</th>
              <th width="50px"></th>
              <th width="50px">Delete</th>
              <th width="50px"></th>
              <th width="50px">Update</th>
            </tr>
          </thead>
          <tbody>
            <Users users={arr} />
          </tbody>
        </table>
      </>
    );
  }
}
export default UserList;
