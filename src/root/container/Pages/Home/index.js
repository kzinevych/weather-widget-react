import React, {Component} from "react";
import {connect} from "react-redux";

import {
    WeatherWidgetDemo,
    WeatherWidgetToday,
    WeatherWidgetForecast,
    WeatherWidgetDaily
} from '../../../../widget';

// @connect(({page}) => ({...page}), {})

// units: 'metric' OR 'imperial'

class Home extends Component {

    render() {
        return (
            <div>
                <div><h1>Weather Widget (Isolate React JS components)</h1></div>
                <div><h3>Easy Start</h3></div>
                <div><h3>Just import widget reducer to (APP/reducers/index.js), and import Widget Component.</h3></div>
                <div>Working on <a href="http://openweathermap.org">Openweather API</a>.</div>
                <WeatherWidgetToday city="Kiev" units="metric" width="300px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
                <WeatherWidgetForecast city="Kiev" units="metric" height="400px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
                <WeatherWidgetDaily city="Kiev" units="metric" width="597px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
            </div>
        )
    }
}

export default Home;

