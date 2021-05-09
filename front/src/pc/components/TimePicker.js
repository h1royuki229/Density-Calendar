import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import '../style/TimePicker.css';

export default class TimePicker extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const {handleInRoomChange, handleOutRoomChange} = this.props;

        if(handleInRoomChange != undefined) {
            handleInRoomChange(e.value);
        }
        if(handleOutRoomChange != undefined) {
            handleOutRoomChange(e.value);
        }
    }

    render() {
        // FIXME: render内にconstが入っている
        const timeSet = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30']

        const defaultOption = "--:--";

        const {inRoom, outRoom} = this.props;
        let time = "";
        if(inRoom != undefined) {
            time = inRoom;
        }
        else {
            time = outRoom;
        }

        if(time == "") {
            time = defaultOption;
        }


        return (
            <div className="form-control">
                <Dropdown options={timeSet} value={time} onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}
