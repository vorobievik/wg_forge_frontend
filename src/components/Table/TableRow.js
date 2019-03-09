import React from 'react';




export default function TableRow(props) {

  const date = new Date(props.created_at * 1000);
  const Birthday = new Date(props.user.birthday * 1000);
  let hours = date.getHours();
  let PM = false;

  if (hours >= 12) {
    hours = hours - 12;
    PM = true;
  }



  let {
    card_number
  } = props
  const url = props.user.company ? props.user.company.url : null;
  const company = props.user.company ? props.user.company.title : null;
  const industry = props.user.company ? props.user.company.industry : null;

  const BirthdayString = Birthday ? `${Birthday.getDate()}/${Birthday.getMonth() + 1}/${Birthday.getFullYear()}` : null;

  let card = card_number.slice(0, 2) + card_number.slice(2, card_number.length - 4).replace(/[0-9]/g, '*') + card_number.slice(length - 4);

  let imgSrc = props.user.avatar;

  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${PM ? 'PM' : 'AM'}`;
  let gender = props.user.gender === 'Male' ? "Mr" : 'Ms';
  const userInfo = gender + ' ' + props.user.first_name + ' ' + props.user.last_name;


  return (
    <tr id={`order_${props.id}`} >
      <td >{props.transaction_id}</td>
      <td className="user-data"><a href='#' onClick={(event) => { props.UserDetailsToggle(props.id, event) }}>{userInfo}</a>
        {props.showUser ? <div className='userDetails' >
          <p >Birthday: {BirthdayString}</p>
          {imgSrc ? <p><img src={imgSrc} width="100px" /></p> : null}
          <p >Company: <a href={url} target="_blank">{company}</a></p>
          <p>Industry:{industry}</p>
        </div> : null}

      </td>
      <td>{dateString}</td>
      <td>$ {props.total}</td>
      <td>{card}</td>
      <td>{props.card_type}</td>
      <td>{props.order_country} ({props.order_ip})</td>
    </tr>
    
  )
}





