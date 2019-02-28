import React, { Component } from 'react';
import Table from './Table/Table'

export default class Main extends Component {
  render() {
    return (
      <div className="container">
        <h1>Orders</h1>
        <Table />
      </div>
    )
  }
}
