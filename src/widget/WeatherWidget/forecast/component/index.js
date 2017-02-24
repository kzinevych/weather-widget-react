import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

// Actions
import {getPosition, getWeatherForecastByCity} from '../action';

// Utils
import Spinner from '../util/Spinner/component';
import {getWeatherIcon} from '../util/GetWeatherIcon';

import {
    ROOT,
    FLEX_ROW,
    FLEX_COLUMN,
    FLEX_CENTER,
    FLEX_MIDDLE,
    FLEX_AROUND,
    FLEX_BETWEEN,
    FLEX_1,
    BG_DARK,
    WIDGETS_CONTAINER,
    WIDGET_COLUMN,
    WIDGET_FORECAST,
    COLUMN,
    WEATHER_LIST,
    WEATHER_LIST_ITEM,
    WEATHER_LIST_UNIT,
    WEATHER_LIST_DATE,
    animated,
    zoomIn,
    fadeIn,
    bounceIn,
    active,
    CELSIUS,
    FAHRENHEIT,
    WEATHER_TYPE,
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
    wi_fahrenheit,
    wi_windy,
    wi_small_craft_advisory,
    wi_humidity,

} from '../scss/root.scss';

@connect( ({weatherForecast}) => ({...weatherForecast}), {getPosition, getWeatherForecastByCity} )

class WeatherWidgetForecast extends Component {
    static PropTypes = {
        appid: PropTypes.string.isRequired,
        city: PropTypes.string,
        units: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string
    };

    static defaultProps = {
        width: '100%',
        height: '400px'
    };

    constructor(props) {
        super(props);
    }
    
    renderDateList(weatherDate) {
        let today = new Date(weatherDate.replace(/-/g, "/"));

        let dd = today.getDate();
        let mm = today.getMonth();
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let currentMonth = month[mm];

        return (
            <div className={WEATHER_LIST_DATE}>
                <div>{currentMonth}</div>
                <div>{dd}</div>
            </div>
        );
    }

    renderTimeList(weatherDate) {
        console.log('weatherDate',weatherDate);
        let today = new Date(weatherDate.replace(/-/g, "/"));

        console.log('today',today);

        let hours = today.getHours();
        let minutes = (today.getMinutes() == 0)? '00' : today.getMinutes();

        return (
            <div className={WEATHER_LIST_DATE}>
                <div>{hours}:{minutes}</div>
            </div>
        );
    }

    renderUnits(units) {
        switch (units) {
            case 'metric':
                return <i className={` ${wi} ${wi_celsius} `}/>;
                break;
            case 'imperial':
                return <i className={` ${wi} ${wi_fahrenheit} `}/>;
                break;
        }
    }

    renderWeatherForecast(weatherForecast) {
        const {units} = this.props;

        if (!weatherForecast)
            return (<Spinner/>);

        let cityName = weatherForecast.city.name;
        let WeatherList;

        if (weatherForecast.cod == 200) {
            WeatherList = weatherForecast.list.map((weatherItem, ii)=> {

                let weatherName = weatherItem.weather[0].main;
                let weatherIconId = weatherItem.weather[0].icon;
                let weatherIcon = getWeatherIcon(weatherIconId);
                let weatherTemp = weatherItem.main.temp;
                let windSpeed = weatherItem.wind.speed;
                let windDegry = weatherItem.wind.deg;
                let humidity = weatherItem.main.humidity;

                return (
                    <div key={Math.random()} className={`${WEATHER_LIST_ITEM} ${animated} ${fadeIn}`}>
                        {(((ii+1)%9==0) || (ii==0))?this.renderDateList(weatherItem.dt_txt):null}
                        <div className={FLEX_ROW}>
                            {this.renderTimeList(weatherItem.dt_txt)}
                            <div className={`${FLEX_ROW} ${FLEX_1} ${FLEX_AROUND}`}>
                                <div className={`${WEATHER_LIST_UNIT}`}>{weatherIcon}</div>
                                <div className={`${WEATHER_LIST_UNIT}`}>{weatherName}</div>
                                <div className={`${WEATHER_LIST_UNIT}`}>{weatherTemp}{this.renderUnits(units)}</div>
                            </div>
                            <div className={`${FLEX_ROW} ${FLEX_1} ${FLEX_AROUND} ${BG_DARK}`}>
                                <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_windy}`}/>{windSpeed}</div>
                                <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_small_craft_advisory}`}/>{windDegry}</div>
                                <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_humidity}`}/>{humidity}</div>
                            </div>
                        </div>
                    </div>
                )
            });
        }

        return (
            <div className={`${WEATHER_LIST} ${COLUMN}`}>
                <div><h1>{cityName}</h1></div>
                {WeatherList}
            </div>
        )
    }

    componentWillMount(){
        const {getPosition, getWeatherForecastByCity, position, units, city, appid} = this.props;

        if (!position && !city) {
            getPosition(units, appid);
        } else {
            getWeatherForecastByCity(city, units, appid);
        }
    }

    render() {
        const {weatherForecast, width, height} = this.props;

        return (
            <div className={ROOT}>
                <div className={`${WIDGETS_CONTAINER}`}>
                    <div className={`${WIDGET_FORECAST}`} style={{width: width, height: height}}>
                        {this.renderWeatherForecast(weatherForecast)}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidgetForecast;
