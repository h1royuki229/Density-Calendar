import React from "react";
import { fetchGetList } from "../../apis/fetchData";

import Modal from 'react-modal'
import CalendarHeatmap from 'reactjs-calendar-heatmap'

import InputBox from './InputBox';


export default class DensityCalendar extends React.Component {
    constructor() {
        super();

        this.customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              paddingBottom        : '50px',
              transform             : 'translate(-50%, -50%)'
            }
        };

        // create_init_data
        const data = [
            {
                "date": "2016-01-01",
                "total": 17164,
                "details": [{
                    "name": "Project 1",
                    "date": "2016-01-01 12:30:45",
                    "value": 9192,
                    "id": 0
                }],
            }
        ];

        const {
            yearstart,
            yearend,
        } = this.initYear();

        this.setlist = this.setlist.bind(this);

        //初期値を2021年に
        fetchGetList(yearstart, yearend, this.setlist);

        this.state = {
            data: data,
            yearstart: yearstart,
            yearend: yearend,
            selectedModalData: "",
            modalIsOpen: false,
            setIsOpen: false
        };
    }

    initYear(){
        let nowdate = Date.now();
        let today = new Date(nowdate);
        let year = today.getFullYear();

        let yearstart = year + "-" + "01-01";
        let yearend = year + "-" + "12-31";

        return{
            yearstart,
            yearend,
        };
    }


    setlist(list_data) {

        var date_list = []
        var data = []

        list_data.map((item) => {
            var name = item.name;
            var id = item.id;
            var tmp_str = item.in_room.split('T');
            var date = tmp_str[0]; // '2020-09-17'
            var time = tmp_str[1].split('.')[0]; // '15:00:00'
            var value = (Date.parse(item.out_room) - Date.parse(item.in_room))/1000;

            if(date_list.includes(date)) {
                console.log('test')
                var add_index = 0
                var _ = data.filter(function(item, index){
                    if (item.date == date){
                        add_index = index;
                        return true;
                    }
                });

                data[add_index].total += value

                var tmp = {
                        "name": name,
                        "date": date + " "+ time,
                        "value": value,
                        "id": id
                }
                data[add_index].details.push(tmp)
            }
            else {
                date_list.push(date);

                var tmp = {
                    "date": date,
                    "total": value,
                    "details": [{
                        "name": name,
                        "date": date + " "+ time,
                        "value": value,
                        "id": id
                    }]
                }
                data.push(tmp)
            }
        });

        this.setState({ data: data });
    }


    openModal(val) {
        this.setState({ selectedModalData: val });
        this.setState({ setIsOpen: true });
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ setIsOpen: false});
        this.setState({ modalIsOpen: false});
    }

    render() {
        return (
            <div>
                <CalendarHeatmap
                    data={this.state.data}
                    handler={this.openModal.bind(this)}>
                </CalendarHeatmap>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal.bind(this)}
                    style={this.customStyles}
                    contentLabel="Modify or Delete Modal">
                    <div class="modal-header">
                        <h2>Reservation Detail</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <InputBox data={this.state.selectedModalData}/>
                    </div>
                </Modal>
            </div>
        );
    }

}