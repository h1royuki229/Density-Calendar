import React, { Component } from "react";
import update from "immutability-helper";
import { fetchDelete } from "../../apis/fetchData";

export default class ShowEachReservation extends React.Component {
  constructor(props) {
    super();
    const item = props.item;
    this.state = {
      name: item.name,
      mon: {
        id: item.mon.id,
        time: item.mon.time,
        selected: false,
      },
      tue: {
        id: item.tue.id,
        time: item.tue.time,
        selected: false,
      },
      wed: {
        id: item.wed.id,
        time: item.wed.time,
        selected: false,
      },
      thu: {
        id: item.thu.id,
        time: item.thu.time,
        selected: false,
      },
      fri: {
        id: item.fri.id,
        time: item.fri.time,
        selected: false,
      },
      // selectされた行の色を変えるためのクラス
      trClass: "",
      mode: "Select",
      modeClass: "btn btn-color",
    };

    this.DeleteMode = this.DeleteMode.bind(this);
    this.DeleteDay = this.DeleteDay.bind(this);
    this.ChangeMonSelect = this.ChangeMonSelect.bind(this);
    this.ChangeTueSelect = this.ChangeTueSelect.bind(this);
    this.ChangeWedSelect = this.ChangeWedSelect.bind(this);
    this.ChangeThuSelect = this.ChangeThuSelect.bind(this);
    this.ChangeFriSelect = this.ChangeFriSelect.bind(this);
  }

  DeleteMode(e) {
    // Deleteモードに変更
    if ((this.state.mode = "Select")) {
      this.setState({
        mode: "Delete",
        modeClass: "btn btn-danger",
        trClass: "bg-warning",
      });
    }
  }

  SelectMode() {
    this.setState({ mode: "Select", modeClass: "btn btn-color", trClass: "" });
  }

  DeleteDay(e) {
    // FIXME resultを使っていない
    let result = { mon: "", tue: "", wed: "", thu: "", fri: "" };

    if (this.state.mon.selected == true) {
      this.setState({ mon: update(this.state.mon, { time: { $set: "" } }) });
      result.mon = fetchDelete(this.state.mon.id);
    }
    if (this.state.tue.selected == true) {
      this.setState({ tue: update(this.state.tue, { time: { $set: "" } }) });
      result.tue = fetchDelete(this.state.tue.id);
    }
    if (this.state.wed.selected == true) {
      this.setState({ wed: update(this.state.wed, { time: { $set: "" } }) });
      result.wed = fetchDelete(this.state.wed.id);
    }
    if (this.state.thu.selected == true) {
      this.setState({ thu: update(this.state.thu, { time: { $set: "" } }) });
      result.thu = fetchDelete(this.state.thu.id);
    }
    if (this.state.fri.selected == true) {
      this.setState({ fri: update(this.state.fri, { time: { $set: "" } }) });
      result.fri = fetchDelete(this.state.fri.id);
    }

    this.SelectMode();
  }

  ChangeMonSelect(e) {
    const setState = !this.state.mon.selected;
    this.setState({
      mon: update(this.state.mon, { selected: { $set: setState } }),
    });
  }
  ChangeTueSelect(e) {
    const setState = !this.state.tue.selected;
    this.setState({
      tue: update(this.state.tue, { selected: { $set: setState } }),
    });
  }
  ChangeWedSelect(e) {
    const setState = !this.state.wed.selected;
    this.setState({
      wed: update(this.state.wed, { selected: { $set: setState } }),
    });
  }
  ChangeThuSelect(e) {
    const setState = !this.state.thu.selected;
    this.setState({
      thu: update(this.state.thu, { selected: { $set: setState } }),
    });
  }
  ChangeFriSelect(e) {
    const setState = !this.state.fri.selected;
    this.setState({
      fri: update(this.state.fri, { selected: { $set: setState } }),
    });
  }

  showCheckBox(day) {
    if (this.state.mode == "Delete") {
      switch (day) {
        case "mon":
          if (this.state.mon.time != "") {
            return (
              <span>
                <input type="checkbox" onChange={this.ChangeMonSelect}></input>
              </span>
            );
          }
          break;
        case "tue":
          if (this.state.tue.time != "") {
            return (
              <span>
                <input type="checkbox" onChange={this.ChangeTueSelect}></input>
              </span>
            );
          }
          break;
        case "wed":
          if (this.state.wed.time != "") {
            return (
              <span>
                <input type="checkbox" onChange={this.ChangeWedSelect}></input>
              </span>
            );
          }
          break;
        case "thu":
          if (this.state.thu.time != "") {
            return (
              <span>
                <input type="checkbox" onChange={this.ChangeThuSelect}></input>
              </span>
            );
          }
          break;
        case "fri":
          if (this.state.fri.time != "") {
            return (
              <span>
                <input type="checkbox" onChange={this.ChangeFriSelect}></input>
              </span>
            );
          }
          break;
      }
    }
  }

  showModeButton() {
    if (this.state.mode == "Select") {
      return (
        <button
          type="submit"
          className={this.state.modeClass}
          onClick={this.DeleteMode}
        >
          {this.state.mode}
        </button>
      );
    } else {
      if (this.state.mode == "Delete") {
        return (
          <button
            type="submit"
            className={this.state.modeClass}
            onClick={this.DeleteDay}
          >
            {this.state.mode}
          </button>
        );
      }
    }
  }

  render() {
    return (
      <tr className={this.state.trClass}>
        <td className="align-middle">{this.state.name}</td>
        <td className="align-middle">
          {this.showCheckBox("mon")}
          {this.state.mon.time}
        </td>
        <td className="align-middle">
          {this.showCheckBox("tue")}
          {this.state.tue.time}
        </td>
        <td className="align-middle">
          {this.showCheckBox("wed")}
          {this.state.wed.time}
        </td>
        <td className="align-middle">
          {this.showCheckBox("thu")}
          {this.state.thu.time}
        </td>
        <td className="align-middle">
          {this.showCheckBox("fri")}
          {this.state.fri.time}
        </td>
        <td className="align-middle">{this.showModeButton()}</td>
      </tr>
    );
  }
}
