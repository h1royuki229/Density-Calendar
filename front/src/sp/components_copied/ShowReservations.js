import React from "react";
import { fetchGetList, fetchGetSummary } from "../../apis/fetchData";
import ShowEachReservation from "./ShowEachReservation";
import logo from "../style/Icon.png";
import Dropdown from "react-dropdown";
import { now } from "jquery";

export default class ShowReservations extends React.Component {
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
      selectedWeekList: [],
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
    this.download = this.download.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.setlist = this.setlist.bind(this);

    fetchGetList(startdaystr, enddaystr, this.setlist);
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

  setlist(list_data) {
    // FIXME: setStateで変更したい
    let selectedWeekList = [];
    let updateNameList = [];
    const daydict = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    list_data.map((item) => {
      const tin = Date.parse(item.in_room);
      const din = new Date(tin);
      const wDay = din.getDay();
      const hour = din.getHours();
      const minutes = din.getMinutes();

      let strin = ("00" + minutes).slice(-2);

      const tout = Date.parse(item.out_room);
      const dout = new Date(tout);
      const hourout = dout.getHours();
      const minout = dout.getMinutes();

      let strout = ("00" + minout).slice(-2);

      console.log(updateNameList);

      if (updateNameList.includes(item.name)) {
        let listItem = selectedWeekList.find((user) => {
          return user.name === item.name;
        });

        listItem[daydict[wDay]].id = item.id;
        listItem[daydict[wDay]].time =
          hour + ":" + strin + "~" + hourout + ":" + strout;
      } else {
        let list = {
          name: item.name,
          mon: {
            id: "",
            time: "",
          },
          tue: {
            id: "",
            time: "",
          },
          wed: {
            id: "",
            time: "",
          },
          thu: {
            id: "",
            time: "",
          },
          fri: {
            id: "",
            time: "",
          },
        };

        list[daydict[wDay]].id = item.id;
        list[daydict[wDay]].time =
          hour + ":" + strin + "~" + hourout + ":" + strout;

        selectedWeekList.push(list);
        updateNameList.push(item.name);
      }
    });

    this.setState({ selectedWeekList: selectedWeekList });
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

    fetchGetList(startdaystr, enddaystr, this.setlist);
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

    fetchGetList(startdaystr, enddaystr, this.setlist);
  }

  download() {
    if (this.state.getmonth == "") {
      let filemonth = this.state.startyear + "-" + this.state.startmonth;
      fetchGetSummary(filemonth);
    } else {
      let filemonth = this.state.startyear + "-" + this.state.getmonth;
      fetchGetSummary(filemonth);
    }
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
                <th style={{width: 300 + 'px'}}>
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
                <th style={{width: 140 + 'px'}}>
                  Mon
                  <br></br>
                  {this.showDate(0)}
                </th>
                <th style={{width: 140 + 'px'}}>
                  Tue
                  <br></br>
                  {this.showDate(1)}
                </th>
                <th style={{width: 140 + 'px'}}>
                  Wed
                  <br></br>
                  {this.showDate(2)}
                </th>
                <th style={{width: 140 + 'px'}}>
                  Thu
                  <br></br>
                  {this.showDate(3)}
                </th>
                <th style={{width: 140 + 'px'}}>
                  Fri
                  <br></br>
                  {this.showDate(4)}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectedWeekList.map((item) => (
                <ShowEachReservation item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
        <div className="row">
          <button className="btn" onClick={this.download}>
            Download　<img src={logo} alt="Download"></img>
          </button>
          <div className="form-control monthboxsize">
            <Dropdown
              options={monthSet}
              value={monthname}
              onChange={this.handleMonthChange}
            />
          </div>
        </div>
      </>
    );
  }
}
