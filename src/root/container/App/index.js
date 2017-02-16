import React, { Component } from 'react';
import logo from './logo.svg';
import {
    SCSS_ROOT,
    SCSS_HEADER,
    SCSS_LOGO,
    SCSS_NTRO,
    SCSS_LOGO_SPIN
} from './scss/root.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className={SCSS_ROOT}>
            {this.props.children}
        </div>
)
    }
}

export default App;
