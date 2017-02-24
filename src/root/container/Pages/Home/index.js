import React, {Component} from "react";
import {connect} from "react-redux";

import {
    WeatherWidgetDemo,
    WeatherWidgetToday,
    WeatherWidgetForecast
} from '../../../../widget';

// @connect(({page}) => ({...page}), {})

// units: 'metric' OR 'imperial'

class Home extends Component {

    render() {
        return (
            <div>
                <div>Home page</div>
                {/*<WeatherWidgetDemo/>*/}
                <WeatherWidgetToday city="Kiev" units="metric" width="300px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
                <WeatherWidgetForecast city="Kiev" units="metric" height="400px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
            </div>
        )
    }
}

export default Home;

