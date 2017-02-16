import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

// Actions
import {getPosition, getCurrentCityWeather, getWeatherByCity} from '../action';

// Utils
import Spinner from '../util/Spinner/component';

import {
    ROOT,
    INPUT,
    WIDGET_CARD,
    animated,
    zoomIn,
    bounceIn,
    TOP_CONTAINER,
    WEATHER_ICON,
    MID_CONTAINER,
    BOT_CONTAINER,
    TEMPERATURE,
    NAMES,
    DATE,
    LOCATION_NAME,
    WEATHER_NAME,
    WIND_HUM,
    wi,
    wi_day_sunny,
    wi_day_cloudy,
    wi_cloud,
    wi_cloudy,
    wi_showers,
    wi_day_rain,
    wi_day_thunderstorm,
    wi_day_snow,
    wi_fog,
    wi_night_clear,
    wi_night_alt_cloudy,
    wi_night_cloudy,
    wi_night_showers,
    wi_night_rain,
    wi_night_thunderstorm,
    wi_night_snow,
    wi_celsius,
    wi_windy,
    wi_small_craft_advisory,
    wi_humidity,

} from '../scss/root.scss'

@connect( ({position, weather}) => ({...position, ...weather}), {getPosition, getCurrentCityWeather, getWeatherByCity} )

class WeatherWidget extends Component {
    renderDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();

        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let currentMonth = month[mm];

        return (
          <div className={DATE}>
              <div>{currentMonth}</div>
              <div>{dd}</div>
          </div>
        );
    }

    renderWeather(weather) {
        if (!weather)
            return (<Spinner/>);

        let locationName = weather.name;
        let temp = weather.main.temp;
        let windSpeed = weather.wind.speed;
        let windDegry = weather.wind.deg;
        let humidity = weather.main.humidity;
        let weatherName, weatherIconId, weatherIcon;
        if (weather.weather[0]) {
            weatherName = weather.weather[0].main;
            weatherIconId = weather.weather[0].icon;

            switch (weatherIconId) {
                case '01d':
                    weatherIcon = <i className={`${wi} ${wi_day_sunny}`}/>;
                    break;
                case '02d':
                    weatherIcon = <i className={`${wi} ${wi_day_cloudy}`}/>;
                    break;
                case '03d':
                    weatherIcon = <i className={`${wi} ${wi_cloud}`}/>;
                    break;
                case '04d':
                    weatherIcon = <i className={`${wi} ${wi_cloudy}`}/>;
                    break;
                case '09d':
                    weatherIcon = <i className={`${wi} ${wi_showers}`}/>;
                    break;
                case '10d':
                    weatherIcon = <i className={`${wi} ${wi_day_rain}`}/>;
                    break;
                case '11d':
                    weatherIcon = <i className={`${wi} ${wi_day_thunderstorm}`}/>;
                    break;
                case '13d':
                    weatherIcon = <i className={`${wi} ${wi_day_snow}`}/>;
                    break;
                case '50d':
                    weatherIcon = <i className={`${wi} ${wi_fog}`}/>;
                    break;
                case '01n':
                    weatherIcon = <i className={`${wi} ${wi_night_clear}`}/>;
                    break;
                case '02n':
                    weatherIcon = <i className={`${wi} ${wi_night_alt_cloudy}`}/>;
                    break;
                case '03n':
                    weatherIcon = <i className={`${wi} ${wi_night_cloudy}`}/>;
                    break;
                case '04n':
                    weatherIcon = <i className={`${wi} ${wi_cloudy}`}/>;
                    break;
                case '09n':
                    weatherIcon = <i className={`${wi} ${wi_night_showers}`}/>;
                    break;
                case '10n':
                    weatherIcon = <i className={`${wi} ${wi_night_rain}`}/>;
                    break;
                case '11n':
                    weatherIcon = <i className={`${wi} ${wi_night_thunderstorm}`}/>;
                    break;
                case '13n':
                    weatherIcon = <i className={`${wi} ${wi_night_snow}`}/>;
                    break;
                case '50n':
                    weatherIcon = <i className={`${wi} ${wi_fog}`}/>;
                    break;
            }
        }

        return (
            <div className={`${animated} ${zoomIn}`}>
                <div className={TOP_CONTAINER}>
                    <div className={WEATHER_ICON}>
                        {weatherIcon}
                    </div>
                </div>
                <div className={MID_CONTAINER}>
                    <div className={TEMPERATURE}>
                        {temp}<i className={` ${wi} ${wi_celsius} `}/>
                    </div>
                    <div className={NAMES}>
                        <div className={LOCATION_NAME}>
                            {locationName}
                        </div>
                        <div className={WEATHER_NAME}>
                            {weatherName}
                        </div>
                    </div>
                    {this.renderDate()}
                </div>
                <div className={BOT_CONTAINER}>
                    <div className={WIND_HUM}>
                        <div>
                            <i className={` ${wi} ${wi_windy} `}/> {windSpeed}
                        </div>
                        <div>
                            <i className={` ${wi} ${wi_small_craft_advisory} `}/> {windDegry}
                        </div>
                        <div>
                            <i className={` ${wi} ${wi_humidity} `}/> {humidity}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onChange(e) {
        const {getWeatherByCity} = this.props;
        getWeatherByCity(e.target.value);
    }

    componentWillMount(){
        const {getPosition, position} = this.props;
        if (!position)
            getPosition();
    }

    render() {
        const {weather} = this.props;

        return (
            <div className={ROOT}>
                <input className={INPUT} type="text" name="city" placeholder="Enter City" onChange={ (e)=>{this.onChange(e)} }/>
                <div className={`${WIDGET_CARD}`}>
                    {this.renderWeather(weather)}
                </div>
            </div>
        )
    }
}

export default WeatherWidget;
