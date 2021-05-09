import React, { useState } from "react";
import {fetchGetNumList} from "../../apis/fetchData";
import ShowEachReservation_SP from "./ShowEachReservation_SP";
import logo from "../style/Icon.png";
import Dropdown from "react-dropdown";
import { now } from "jquery";
// PCverからの変更点　
// 1.import 2.selectedweeklist 3.setlist 4.fetchgetlist→fetchgetnumlist 5.download関係削除 6.render

export default class ShowReservations_SP extends React.Component {
  constructor() {
    super();
    const {
      startyear,
      startmonth,
      startdate,
      endmonth,
      enddate,
      startdaystr,
      enddaystr,
      today,
    } = this.initDate();

    this.state = {
      // selectedWeekList: [[],[],[],[],[]],
      selectedWeekList: {mon:{},tue:{},wed:{},thu:{},fri:{}},
      startyear: startyear,
      startmonth: startmonth,
      startdate: startdate,
      endmonth: endmonth,
      enddate: enddate,
      getmonth: "",
      today: today,
    };

    this.startdayChangebefore = this.startdayChangebefore.bind(this);
    this.startdayChangeafter = this.startdayChangeafter.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.setlist = this.setlist.bind(this);

    fetchGetNumList(startdaystr, enddaystr, this.setlist);
  }

  //その週の月、金の日付を取得
  initDate() {
    let nowday = Date.now();
    let today = new Date(nowday);
    let startday = new Date(nowday);
    let endday = new Date(nowday);
    let startyear = startday.getUTCFullYear();
    let day = startday.getUTCDay();
    let sub = day - 1;
    if (sub < 0) {
      sub = 6;
    }
    startday.setUTCDate(startday.getUTCDate() - sub);
    endday.setUTCDate(startday.getUTCDate() + 4);

    const todayMonth = ("00" + (today.getUTCMonth() + 1)).slice(-2);
    const todayDate = String(today).split(' ')[2];

    today = todayMonth + '/' + todayDate;

    const startmonth = ("00" + (startday.getUTCMonth() + 1)).slice(-2);
    const startdate = ("00" + startday.getUTCDate()).slice(-2);
    const startdaystr =
      startday.getUTCFullYear() + "-" + startmonth + "-" + startdate;

    const endmonth = ("00" + (endday.getUTCMonth() + 1)).slice(-2);
    const enddate = ("00" + endday.getUTCDate()).slice(-2);
    const enddaystr = endday.getUTCFullYear() + "-" + endmonth + "-" + enddate;

    return {
      startyear,
      startmonth,
      startdate,
      endmonth,
      enddate,
      startdaystr,
      enddaystr,
      today,
    };
  }

  // PCverから変更したとこ
  setlist(list_data) {
    const daydict = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let selectedWeekList = [];

    // list_data sort
    list_data.sort(function(a,b){
      if(a.start<b.start) return -1;
      if(a.start>b.start) return 1;
      return 0;
    });

    list_data.map((item) => {
      const tin = Date.parse(item.start);
      const din = new Date(tin);
      const wDay = din.getDay(); 
      const hour = din.getHours();
      const minutes = din.getMinutes();
      let strin = ("00" + minutes).slice(-2);
      const dout = new Date(tin);
      dout.setMinutes(dout.getMinutes() + 30);
      const hourout = dout.getHours();
      const minout = dout.getMinutes();
      let strout = ("00" + minout).slice(-2);
      const time_str = hour + ":" + strin + "~" + hourout + ":" + strout;
      let list = {
        wDay:'',
        start:'',
        end:'',
        number:''
      }
      list.wDay   = daydict[wDay]
      list.start  = hour + ":" + strin
      list.end    = hourout + ":" + strout
      list.number = item.number
      if (selectedWeekList.length>0){
        let pre_list = selectedWeekList.pop()
        if (pre_list.wDay==list.wDay && pre_list.end==list.start && pre_list.number==list.number){
          pre_list.end = list.end
          selectedWeekList.push(pre_list);
        }else{
          selectedWeekList.push(pre_list);
          selectedWeekList.push(list);
        }
      }else{
        selectedWeekList.push(list);
      }
    });

    let selectedWeekList2 = {mon:{},tue:{},wed:{},thu:{},fri:{}};
    selectedWeekList2.mon = selectedWeekList.filter(function (element) {return element.wDay=='mon';});
    selectedWeekList2.tue = selectedWeekList.filter(function (element) {return element.wDay=='tue';});
    selectedWeekList2.wed = selectedWeekList.filter(function (element) {return element.wDay=='wed';});
    selectedWeekList2.thu = selectedWeekList.filter(function (element) {return element.wDay=='thu';});
    selectedWeekList2.fri = selectedWeekList.filter(function (element) {return element.wDay=='fri';});
    this.setState({ selectedWeekList: selectedWeekList2 });
  }

  startdayChangebefore() {
    let beforedate = new Date(
      this.state.startyear,
      this.state.startmonth - 1,
      this.state.startdate
    );
    let afterstartinfo = new Date(beforedate);
    let afterendinfo = new Date(beforedate);

    afterstartinfo.setUTCDate(beforedate.getUTCDate() - 7);
    afterendinfo.setUTCDate(beforedate.getUTCDate() - 3);

    const afterstartmonth = ("00" + (afterstartinfo.getMonth() + 1)).slice(-2);
    const afterstartdate = ("00" + afterstartinfo.getDate()).slice(-2);

    const afterendmonth = ("00" + (afterendinfo.getMonth() + 1)).slice(-2);
    const afterenddate = ("00" + afterendinfo.getDate()).slice(-2);

    this.setState({ startyear: afterstartinfo.getFullYear() });
    this.setState({ startmonth: afterstartmonth });
    this.setState({ startdate: afterstartdate });

    this.setState({ endmonth: afterendmonth });
    this.setState({ enddate: afterenddate });

    const startdaystr =
      afterstartinfo.getFullYear() +
      "-" +
      afterstartmonth +
      "-" +
      afterstartdate;
    const enddaystr =
      afterendinfo.getFullYear() + "-" + afterendmonth + "-" + afterenddate;

    fetchGetNumList(startdaystr, enddaystr, this.setlist);
  }

  startdayChangeafter() {
    let beforedate = new Date(
      this.state.startyear,
      this.state.startmonth - 1,
      this.state.startdate
    );
    let afterstartinfo = new Date(beforedate);
    let afterendinfo = new Date(beforedate);

    afterstartinfo.setUTCDate(beforedate.getUTCDate() + 7);
    afterendinfo.setUTCDate(beforedate.getUTCDate() + 11);

    const afterstartmonth = ("00" + (afterstartinfo.getMonth() + 1)).slice(-2);
    const afterstartdate = ("00" + afterstartinfo.getDate()).slice(-2);

    const afterendmonth = ("00" + (afterendinfo.getMonth() + 1)).slice(-2);
    const afterenddate = ("00" + afterendinfo.getDate()).slice(-2);

    this.setState({ startyear: afterstartinfo.getFullYear() });
    this.setState({ startmonth: afterstartmonth });
    this.setState({ startdate: afterstartdate });

    this.setState({ endmonth: afterendmonth });
    this.setState({ enddate: afterenddate });

    const startdaystr =
      afterstartinfo.getFullYear() +
      "-" +
      afterstartmonth +
      "-" +
      afterstartdate;
    const enddaystr =
      afterendinfo.getFullYear() + "-" + afterendmonth + "-" + afterenddate;

    fetchGetNumList(startdaystr, enddaystr, this.setlist);
  }

  showDate(diffMonday) {
    let color = "black";

    let date = this.state.startmonth + '/' + (Number(this.state.startdate) + diffMonday);
    if (date == this.state.today) {
      color = "red"
    }

    return (
      <div style={{color: color}}>
        {date}
      </div>
    );
  }

  handleMonthChange(e) {
    const monthSet = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthname = e.value;
    let monthnum;
    //if(monthname!=""){
    monthnum = monthSet.indexOf(monthname) + 1;
    // FIXME: setStateで変えたいが変更ができない
    this.state.getmonth = monthnum;
  }

  render() {
    // FIXME: render内にconstが入っている
    const monthSet = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthname = "--";
    if (this.state.getmonth != "") {
      monthname = monthSet[this.state.getmonth];
    } else if (this.state.getmonth == "") {
      monthname = monthSet[this.state.startmonth - 1];
    }

    return (
      <>
        <div>
          <table className="table table-striped text-center table-hover">
            <thead>
              <tr>                
                <th  colspan="3" style={{width: 300 + 'px'}}>
                  <button
                    className="btn btn-link arrow"
                    onClick={this.startdayChangebefore}
                  >
                    ◁
                  </button>
                  {this.state.startmonth}/{this.state.startdate}-
                  {this.state.endmonth}/{this.state.enddate}
                  <button
                    className="btn btn-link arrow"
                    onClick={this.startdayChangeafter}
                  >
                    ▷
                  </button>
                </th>
              </tr>
            </ thead>
            <thead>
              <tr>
                <th style={{width: 140 + 'px'}}>
                  Day
                </th>              
                <th style={{width: 140 + 'px'}}>
                  Time
                </th>              
                <th style={{width: 140 + 'px'}}>
                  Number
                </th>                
              </tr>
            </thead>
            <thead>            
              <tr>
              </tr>
            </thead>
              <ShowEachReservation_SP item={this.state.selectedWeekList.mon} wDay="mon" date_str={this.showDate(0)}/>
              <ShowEachReservation_SP item={this.state.selectedWeekList.tue} wDay="tue" date_str={this.showDate(1)}/>
              <ShowEachReservation_SP item={this.state.selectedWeekList.wed} wDay="wed" date_str={this.showDate(2)}/>
              <ShowEachReservation_SP item={this.state.selectedWeekList.thu} wDay="thu" date_str={this.showDate(3)}/>
              <ShowEachReservation_SP item={this.state.selectedWeekList.fri} wDay="fri" date_str={this.showDate(4)}/>
          </table>
        </div>
      </>
    );
  }
}
