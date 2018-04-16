import React, {Component} from 'react';
import {AppBar, IconButton, TimePicker, Toggle, Slider} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';
import ResetIcon from 'material-ui/svg-icons/action/settings-backup-restore';
import TimeIcon from 'material-ui/svg-icons/av/av-timer';

import * as Str from './Strings';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        var time = new Date();
        var initialDifference = 600000;
        this.state = {
            current: time.getTime(),
            zoneOffset: time.getTimezoneOffset(),
            start: time.getTime(),
            end: (time.getTime() + initialDifference),
            diff: ("00:" + initialDifference / 60000),
            isBreak: false,
            breakTime: 0,
            breakElement: ''
        }
    }

    onBreakSliderChange = (event, value) => {
        //calculateBreakTime
        var intervalInMinutes = 120;
        var intervals = 1 / value;
        this.setState({breakTime: intervalInMinutes / intervals}, () => {this.getDur()})
    }

    shouldComponentUpdate(){
        // console.log(this.state);
        return true;
    }

    onBreakToggle = (event, value) => {
        var breakElement = <div>
            <Slider step={0.125} value={0}
                    onChange={this.onBreakSliderChange}
            />
        </div>
        var toSet = '';
        if(value){
            toSet = breakElement;
        }
        this.setState({
            isBreak: value,
            breakElement: toSet,
            breakTime: 0
        })
    }

    render() {
        return (
            <div className="App">
                <MTP>
                    <AppBar
                        title={Str.APP_TITLE}
                        iconElementRight={<IconButton><ResetIcon/></IconButton>}
                        iconElementLeft={<IconButton><TimeIcon/></IconButton>}
                    />
                </MTP>
                <MTP>
                    <div className="Body">
                        <TimePicker
                            format="ampm"
                            hintText={Str.TIME_START}
                            value={new Date(this.state.start)}
                            onChange={this.handleStartChange}
                        />
                        <Toggle
                            label="Break?"
                            onToggle={this.onBreakToggle}
                        />
                        {this.state.breakElement}

                        <TimePicker
                            format="ampm"
                            hintText={Str.TIME_END}
                            value={new Date(this.state.end)}
                            onChange={this.handleEndChange}
                        />
                        <p>{this.state.breakTime} mins break</p>
                        <h1>{this.state.diff} </h1>
                    </div>
                </MTP>
            </div>
        );
    }
    handleStartChange = (event, date) => {
        this.setState({start: date}, () => {
            this.getDur()
        });
    }
    handleEndChange = (event, date) => {
        this.setState({end: date}, () => {
            this.getDur()
        });

    }
    getDur(){
        var timeDiffInMillis = this.state.end - this.state.start;
        if (timeDiffInMillis < 0){
            timeDiffInMillis = timeDiffInMillis * -1;
        }
        console.log(timeDiffInMillis);
        var minutes = timeDiffInMillis / 60000;
        var hours = 0
        var output = '';
        console.log(minutes);
        if(this.state.breakTime > 0){
            minutes = minutes - this.state.breakTime
        }
        console.log(minutes + "minus break");
        if(minutes > 59){
            //more than an hour
            hours = Math.trunc(minutes / 60);
            console.log(hours);
            minutes = minutes % 60;
            console.log(minutes);
            output = hours + ":" +  minutes + " ";
        }else{
            //less than an hour
            output = "0:" + minutes;
        }
        // console.log(minutes);

        this.setState({diff: output });
    }
}

export default App;
