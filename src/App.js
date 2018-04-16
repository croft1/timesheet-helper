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
            time: {
                current: time.getTime(),
                zoneOffset: time.getTimezoneOffset(),
                start: time.getTime(),
                end: time.getTime()
            }

        }
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
                            value={this.state.time.current}
                            onChange={this.handleStartChange}
                        />
                        <TimePicker
                            format="ampm"
                            hintText={Str.TIME_END}
                            value={this.state.time.current}
                            onChange={this.handleEndChange}
                        />
                    </div>
                </MTP>
                <h1>Duration: {this.getDur()}</h1>
            </div>
        );
    }

    getDur(){
        return (this.state.time.start - this.state.time.end);
    }
}

export default App;
