import React from 'react'

export default function InputSearch({infoSearch,resetFunc}) {

  return (
  
       <tr>
        <th>Search:</th>
        <th><input type="text" id="search" placeholder='search'  onChange={(e)=>{infoSearch(e.target.value)}}/></th>
     </tr>
  
  )
}
