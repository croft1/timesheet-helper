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
            diff: initialDifference,
            isBreak: false,
            breakTime: 0,
            breakElement: ''
        }
    }

    onBreakSliderChange = (event, value) => {
        //calculateBreakTime
        var intervalInMinutes = 120;
        var intervals = 1 / value;
        this.setState({breakTime: intervalInMinutes / intervals})
    }

    shouldComponentUpdate(){
        console.log(this.state);
        return true;
    }

    onBreakToggle = (event, value) => {
        var breakElement = <div>
            <Slider step={0.125} value={0} onChange={this.onBreakSliderChange}/>
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
                        <p>{this.state.breakTime + ' minutes break'}</p>
                        <h1>{this.state.diff}</h1>
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
        var timeDiffInMillis = this.state.start - this.state.end;
        console.log(timeDiffInMillis);

        this.setState({diff: (this.state.start - this.state.end) });
    }
}

export default App;
