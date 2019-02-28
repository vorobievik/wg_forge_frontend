import React from 'react'

export default function TableRow(props) {

  const date = new Date(props.created_at * 1000);
  let hours = date.getHours();
  let PM = false;

  if (hours >= 12) {
      hours = hours - 12;
      PM = true;
  }

  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${PM ? 'PM' : 'AM'}`;

  return (
    <tr id={`order_${props.id}`} >
        <td>{props.transaction_id}</td>
        <td>{props.user_id}</td>
        <td>{dateString}</td>
        <td>{props.total}</td>
        <td>{props.card_number}</td>
        <td>{props.card_type}</td>
        <td>{props.order_country}</td>
    </tr>
  )
}

