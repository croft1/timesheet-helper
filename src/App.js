import React, {Component} from 'react';
import logo from './logo.svg';
import {AppBar, IconButton, TimePicker} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';
import ResetIcon from 'material-ui/svg-icons/action/settings-backup-restore';
import TimeIcon from 'material-ui/svg-icons/av/av-timer';

import * as Str from './Strings';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        var time = new Date();
        this.state = {
            current: time.getTime(),
            zoneOffset: time.getTimezoneOffset(),
            start: time.getTime(),
            end: time.getTime(),
            diff: 0,
            isBreak: false,


        }
    }

    shouldComponentUpdate(){
        console.log(this.state);
        return true;
    }

    render() {
        return (
            <div className="App">
                <MTP>
                    <AppBar
                        title={Str.APP_TITLE}
                        iconElementRight={<IconButton><ResetIcon/></IconButton>}
                        // iconElementLeft={<IconButton><TimeIcon/></IconButton>}
                    />
                </MTP>
                <MTP>
                    <div className="Body">
                        <TimePicker
                            format="ampm"
                            hintText={Str.TIME_START}
                            value={new Date(this.state.current)}
                            onChange={this.handleStartChange}
                        />
                        <TimePicker
                            format="ampm"
                            hintText={Str.TIME_END}
                            value={new Date(this.state.current + 1000000)}
                            onChange={this.handleEndChange}
                        />
                    </div>
                </MTP>
                <h1>Duration: {this.state.diff}</h1>
            </div>
        );
    }
    handleStartChange = (event, date) => {
        this.setState({start: date});
        this.getDur();
    }
    handleEndChange = (event, date) => {
        this.setState({end: date});
        this.getDur();

    }
    getDur(){
        this.setState({diff: (this.state.time.start - this.state.time.end) });
    }
}

export default App;
