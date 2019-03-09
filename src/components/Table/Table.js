import React, { Component } from 'react';

import TableRow from './TableRow';
import orders from '../../../data/orders.json';
import users from '../../../data/users.json';
import companies from '../../../data/companies.json';
import InputSearch from './InputSearch';
import ThSort from '../THsort'


// create function for output statistics information
const calculateStatistics = (orders) => {
  let OrdersTotal = null;
  let MaleCheck = null;
  let MaleArray = null;
  let FemaleCheck = null;
  let FemaleArray = null;
  let AverageCheck = null;
  let Mediana= null;
  let arraySort = null;
  let a=[]
 orders.forEach( order => {
    
    a=[...a,order.total]
  })
  arraySort = a.sort((a,b)=>{

    if (parseFloat(a) > parseFloat(b)) return 1
    if (parseFloat(a) < parseFloat(b)) return -1
  })
 
     if(Number.isInteger(arraySort.length/2)) {
      Mediana = (parseFloat(arraySort[(arraySort.length/2 - 1)]) + parseFloat(arraySort[arraySort.length/2])/2)
     }
     else{Mediana = parseFloat(arraySort[Math.floor(arraySort.length/2) ])}
     console.log(parseFloat(arraySort[Math.floor(arraySort.length/2) ]))
  


  MaleArray = orders.filter(order => order.user.gender === 'Male')
  if (MaleArray.length) {
    MaleCheck = (MaleArray.reduce((sum, current) => {
      return sum + +current.total
    }, 0) / MaleArray.length).toFixed(2);
  }
  else{MaleCheck=null}
  
  FemaleArray = orders.filter(order => order.user.gender === 'Female')
  if(FemaleArray.length){
    FemaleCheck = (FemaleArray.reduce((sum, current) => {
    return sum + +current.total
  }, 0) / FemaleArray.length).toFixed(2);
  } 
  else{FemaleCheck=null}


  OrdersTotal = orders.reduce((sum, current) => {
    return sum + +current.total
  }, 0).toFixed(2)

  AverageCheck = (OrdersTotal / orders.length).toFixed(2)

  return { OrdersTotal, MaleCheck, FemaleCheck, AverageCheck,Mediana }
}
// create function for filter ascendic/descending
const filterOrders = (orders, text) => {

  let propsToCompare = ['transaction_id', 'total', 'card_type', 'order_country', 'order_ip'];

  return orders.filter(
    order => {
      if ((order.user.first_name.toLowerCase() + ' ' + order.user.last_name.toLowerCase()).includes(text)) {
        return true;
      }

      for (let i = 0; i < propsToCompare.length; i++) {
        if (order[propsToCompare[i]].toLowerCase().includes(text)) return true;
      }
      
      return false;
    })
}


export default class Table extends Component {

  state = {
    orders: null,
    users: null,
    companies: null,
    showUserDetailId: [],
    sort: {
      value: null,
      ascDirection: true
    },
    searchInputValue: '',

  }

  componentDidMount = () => {
    // To do: add fetch request

    fetch('https://api.exchangeratesapi.io/latest').then(response => {console.log(response)});
    this.orderFunc();
     this.userFunc();

    this.setState({
       orders,
       users,
      companies
    });
   }

  UserDetailsToggle = (id, event) => {
    event.preventDefault();

    if (this.state.showUserDetailId.indexOf(id) === -1) {
      this.setState(({
        showUserDetailId
      }) => {
        let arr = [...showUserDetailId, id]

        return {
          showUserDetailId: arr
        }
      })
    } else {
      this.setState(({
        showUserDetailId
      }) => {
        let arr = [...showUserDetailId]
        arr.splice(this.state.showUserDetailId.indexOf(id), 1)
        return {
          showUserDetailId: arr
        }
      })
    }
  }

  userFunc = () => {
    users.forEach(user => {
      if (user.company_id) {
        let company = companies.find(c => c.id === user.company_id)
        user.company = company;
      }
    })
  }

  orderFunc = () => {
    orders.forEach(order => {
        let user = users.find(u => u.id === order.user_id)
        order.user = user
      }
    )
  }

  textInputhandler = (text) => {
    this.setState({searchInputValue: text.trim()})
  }


  compare = (a, b) => {

    const direction = this.state.sort.ascDirection? 1:-1

    switch (this.state.sort.value) {
      case 'transaction_id':
        return a.transaction_id > b.transaction_id ? direction : direction * -1
        break
      case 'total':
        return parseFloat(a.total) > parseFloat(b.total) ? direction : direction * -1
        break
      case 'created_at':
        return parseFloat(a.created_at) > parseFloat(b.created_at) ? direction : direction * -1
      case 'first_name':
      if ( this.state.sort.ascDirection) {
        if ( a.user.first_name> b.user.first_name) return 1
        if (a.user.first_name < b.user.first_name) return -1
      } else {
        if ( a.user.last_name> b.user.last_name) return 1
        if (a.user.last_name < b.user.last_name) return -1
      }
       
        break
      case 'card_type':
        if (a.card_type > b.card_type) return direction
        if (a.card_type < b.card_type) return direction * -1
        break
      case 'order_country':
      if ( this.state.sort.ascDirection) {
        if (a.order_country > b.order_country) return 1
        if (a.order_country < b.order_country) return -1
      }
      else{
        if (parseFloat(a.order_ip) > parseFloat(b.order_ip)) return 1
        if (parseFloat(a.order_ip) <parseFloat(b.order_ip)) return -1
       }

    }
  }


  sortFunction = (type) => {
    const { sort } = this.state;

    if ( sort.value === type ) {
      this.setState({ sort: { value: type, ascDirection: !this.state.sort.ascDirection } })
    } else {
      this.setState({ sort: { value: type, ascDirection: true } })
    }
  }


  render() {

    let {
      orders,
      searchInputValue
    } = this.state;

    let rows = null;
    let statistics = null;

    let stats = { 
      OrdersTotal: null,
      MaleCheck: null,
      FemaleCheck: null,
      AverageCheck: null,
      Mediana:null
    }

    if (orders) {

      if (searchInputValue) {
        orders = filterOrders(orders, searchInputValue);
        
      }

      if (!orders.length) {
        rows = (<tr><td colSpan="7">Nothing found</td></tr>)
      } else {
        const sortedOrders = orders.sort(this.compare);
        

        stats = calculateStatistics(sortedOrders);

        rows = sortedOrders.map(order => (
          <TableRow 
            key={order.id} 
            {...order} 
            index={order}
            UserDetailsToggle={this.UserDetailsToggle}
            showUser={this.state.showUserDetailId.indexOf(order.id) >= 0}
         
                      />
        ))
      }
      statistics=  orders.length? 

      (
        <tbody>
          <tr>
  <td>Orders Count</td>
  <td>{orders.length}</td>
  </tr>
  <tr>
      <td>Orders Total</td>
      <td>$ {stats.OrdersTotal}</td>
  </tr>
  <tr>
      <td>Median Value</td>
      <td>$ {stats.Mediana}</td>
  </tr>
  <tr>
      <td>Average Check</td>
      <td>$ {stats.AverageCheck}</td>
  </tr>
  <tr>
      <td>Average Check (Female)</td>
      <td>$ {stats.FemaleCheck}</td>
  </tr>
  <tr>
      <td>Average Check (Male)</td>
      <td>$ {stats.MaleCheck}</td>
  </tr>
  </tbody>) : '`n/a.'

    }

    return (
      <table className="table table-striped">
        <thead>
        <InputSearch infoSearch={this.textInputhandler}
        />
          <tr>
           
            <ThSort 
              onSort={()=>{this.sortFunction('transaction_id')}}
              isActive={this.state.sort.value === 'transaction_id'} 
              ascDirection={this.state.sort.ascDirection}
              title="Transaction ID" />
            <ThSort 
              onSort={()=>{this.sortFunction('first_name')}}
              isActive={this.state.sort.value === 'first_name'} 
              ascDirection={this.state.sort.ascDirection}
              title="User Info" />
                <ThSort 
              onSort={()=>{this.sortFunction('created_at')}}
              isActive={this.state.sort.value === 'created_at'} 
              ascDirection={this.state.sort.ascDirection}
              title="Order Date" />
                <ThSort 
              onSort={()=>{this.sortFunction('total')}}
              isActive={this.state.sort.value === 'total'} 
              ascDirection={this.state.sort.ascDirection}
              title="Order Amount" />
            <th onClick={()=>{this.sortFunction()} }>Card Number</th>
            <ThSort 
              onSort={()=>{this.sortFunction('card_type')}}
              isActive={this.state.sort.value === 'card_type'} 
              ascDirection={this.state.sort.ascDirection}
              title="Card Type" />
                 <ThSort 
              onSort={()=>{this.sortFunction('order_country')}}
              isActive={this.state.sort.value === 'order_country'} 
              ascDirection={this.state.sort.ascDirection}
              title="Location" />
           
           
          </tr>
        </thead>
        <tbody>
      {rows}
      
       </tbody>
       { statistics}
      </table>
    )
  }
}
