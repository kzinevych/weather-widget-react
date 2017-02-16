import React, {Component} from "react";
import {connect} from "react-redux";
import {
    WeatherWidget
} from '../../../../widget';

// @connect(({page}) => ({...page}), {})

class Home extends Component {

    render() {
        return (
            <div>
                <div>Home page</div>
                <WeatherWidget/>
            </div>
        )
    }
}

export default Home;

