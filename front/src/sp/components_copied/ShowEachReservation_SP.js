import React, { Component } from "react";

export default function ShowEachReservation_SP(props) {
  const item      = props.item;
  const date_str  = props.date_str;
  const wDay      = props.wDay;
  let data = [];
  for (let i = 0; i < item.length; i++) {
    data.push({
      time:item[i].start+"~"+item[i].end,
      number:item[i].number
    })
  }
  
  let row1 = "";
  if (data.length>0){
    row1 = (()=><tr>
    <td rowspan={(data.length).toString(10)} style={{width: 140 + 'px'} }>
      {wDay}
      <br></br>{date_str}
    </td>
    <td>{data[0].time}</td>
    <td>{data[0].number}</td>
    </tr>);
    if (data.length==1){
      return (<tbody>{row1()}</tbody>);
    }
  }else{
    return (<tbody><tr>
      <td style={{width: 140 + 'px'} }>{wDay}<br></br>{date_str}</td>
      <td></td><td>
      </td>
      </tr></tbody>);
  }

  return (<tbody>
    {row1()}
    {data.slice(1).map((item) => <tr>
      {/* <td></td> */}
      <td>{item.time}</td>
      <td>{item.number}</td>
    </tr>)}
    </tbody>
  );
}

