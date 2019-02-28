import React, { Component } from 'react';

import TableRow from './TableRow'
import orders from '../../../data/orders.json';
import users from '../../../data/users.json';
import companies from '../../../data/companies.json';

export default class Table extends Component {

  state = {
    orders: null,
    users: null,
    companies: null,
  }

  componentDidMount = () => {
    // To do: add fetch request
    this.setState({ orders, users, companies });
  }
  

  render() {

    const { orders } = this.state;

    let rows = null;

    if ( orders ) {
      rows = orders.map(order => (
        <TableRow 
          key={order.id}
          {...order}
          />
      ))
    }
    
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>User Info</th>
            <th>Order Date</th>
            <th>Order Amount</th>
            <th>Card Number</th>
            <th>Card Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
