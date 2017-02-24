import React, { Component } from 'react';

import {
    SPINNER,
    LOADING,
    LOAD,
    LOADING_INNER,
    LOADING_CIRCLE
} from '../scss/index.scss';

class Spinner extends Component {

    render() {

        return (
            <div className={SPINNER}>
                <div className={LOADING}>
                    <svg className={LOAD} x="0px" y="0px" viewBox="0 0 150 150">
                        <circle className={LOADING_INNER} cx="75" cy="75" r="60"></circle>
                    </svg>
                    <span>Please wait...</span>
                </div>
            </div>
        );

    }
}

export default (Spinner);
