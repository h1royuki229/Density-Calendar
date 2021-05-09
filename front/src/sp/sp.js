import React, { Component } from 'react';
import {BrowserRouter,Route,Link} from "react-router-dom";
import {fetchGetList,fetchApply,fetchDelete,fetchGetNumList,fetchGetSummary} from "../apis/fetchData"
// styleが動的じゃないから、pc/componetnt/をそのままコピー (20201008)
import InputBox_SP from './components_copied/InputBox';
import Footer_SP from './components_copied/Footer';
import Header from './components_copied/Header';
import ShowReservations_SP from './components_copied/ShowReservations_SP'

// fetchGetList("2020-08-01","2020-08-07")
// fetchApply({reservations:{id:10,name:"name1",in:"2020-08-24T10:00:00.000Z",out:"2020-08-24T19:30:00.000Z"}})
// fetchDelete(0)
// fetchGetNumList("2020-08-01","2020-08-07")
// fetchGetSummary("2020-08-01","2020-08-31")

export default class SP extends Component {

  constructor(props) {
    super(props);
    this.title = 'Nagao-Lab Schedule Manager';
  }
    
  // HTMLをどう描画するか
  render() {
    return (
      <div className="container SP">
          <div className="Header">
              <Header title={this.title} />
          </div>
          <div className="InputBox_SP">
              <InputBox_SP/>
          </div>
          <div>
              <ShowReservations_SP/>
          </div>
          <div className="Footer_SP">
              <Footer_SP/>
          </div>
      </div>
        );
      
  }
}