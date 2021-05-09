import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import ApplyModal from './components/ApplyModal';
import DensityCalendar from './components/DensityCalendar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


export default class PC extends Component {

    constructor(props) {
        super(props);
    }


    // HTMLをどう描画するか
    render() {
        return (
            <div>
                <div className="d-flex flex-column m-5 text-center">
                    <div className="align-content-center">
                        <Header/>
                    </div>
                    <p className="about px-5 pb-5 align-content-center">
                        This Density Calendar visualizes "Customer Reservations Time" over the year, month, weeks and each of the days on demand.<br/>
                        If there are many reservations on the day,  the calendar's color will deeper,<br/> so you can see which day is crowded in this COVID-19 situation.
                    </p>
                    <div className="container-fluid">
                        <Card bg="light">
                            <div className="pb-5 bg-white">
                                <DensityCalendar/>
                            </div>
                            <Card.Body>
                                <p className="align-content-center">When you place the cursor on the above dot, you can see reservations of the day.<br/> If you want to apply, click below</p>
                                <ApplyModal/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="Footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}
