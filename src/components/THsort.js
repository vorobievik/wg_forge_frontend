import React from 'react'


export default function ThSort  (props) {


  let arrow = null
  if (props.isActive) {
    if (props.ascDirection) {
      arrow = <span>&#8595;</span>
    } else {
      arrow = <span>&#8593;</span>
      
    }
  }
  return (
    <th style={{ 'cursor': 'pointer' }} onClick={props.onSort}>
      {props.title}
      {arrow}
    </th>
  )
}