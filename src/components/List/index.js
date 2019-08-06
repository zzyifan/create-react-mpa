import React, { Component } from "react";

export class List extends Component {
  render() {
    let { title } = this.props;
    return (
      <div className="List">
        <ul className="list">
          <li>
            <a href="/">index</a>
          </li>
          <li>
            <a href="/list">list</a>
          </li>
          <li>
            <a href="/home">home</a>
          </li>
        </ul>
        <h2>{title}</h2>
      </div>
    );
  }
}

export default List;
