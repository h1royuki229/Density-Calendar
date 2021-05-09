import React, { Component } from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import PC from './pc/pc';
import SP from './sp/sp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        device: 'pc',
    };
  }

  componentDidMount() {
    // pc or sp
    if (window.navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.setState({ device: 'sp' });
    } else {
      this.setState({ device: 'pc' });
    }
  }

  render() {
    let showComponent;
    if(this.state.device ===　"pc"){
      showComponent = <PC/>
    }else if (this.state.device ===　"sp"){
      showComponent = <SP/>
    }

    return (
      <div>{showComponent}</div>
    );
  }
}

export default App;
