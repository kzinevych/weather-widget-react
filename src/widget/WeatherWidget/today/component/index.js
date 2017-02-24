import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

// Actions
import {getPosition, getCurrentCityWeather, getWeatherByCity, setUnit} from '../action';

// Utils
import Spinner from '../util/Spinner/component';
import {getWeatherIcon} from '../util/GetWeatherIcon';

import {
    ROOT,
    INPUT,
    TITLE,
    FLEX_ROW,
    FLEX_COLUMN,
    FLEX_CENTER,
    FLEX_MIDDLE,
    FLEX_AROUND,
    FLEX_BETWEEN,
    FLEX_1,
    BG_DARK,
    WIDGETS_CONTAINER,
    WIDGET_CARD,
    animated,
    zoomIn,
    fadeIn,
    bounceIn,
    active,
    TOP_CONTAINER,
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

@connect( ({weatherToday}) => ({...weatherToday}), {getPosition, getCurrentCityWeather, getWeatherByCity, setUnit} )

class WeatherWidgetToday extends Component {
    static PropTypes = {
        appid: PropTypes.string,
        units: PropTypes.string,
        city: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string
    };

    static defaultProps = {
        width: '100%',
        height: '385px'
    };

    constructor(props) {
        super(props);

        this.state = {
            isActiveCel: true,
            isActiveFah: false
        }
    }


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

    renderWeather(weather) {
        const {setUnit, city, units, appid} = this.props;

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
            weatherIcon = getWeatherIcon(weatherIconId);
        }

        return (
            <div className={`${animated} ${zoomIn}`}>
                <div className={TOP_CONTAINER}>
                    <div className={WEATHER_TYPE}>
                        <div className={CELSIUS}><a className={ (units == 'metric')?`${active}`:'' } onClick={ ()=>{ setUnit('metric', city, appid); } }><i className={` ${wi} ${wi_celsius} `}/></a></div>
                        <div className={FAHRENHEIT}><a className={ (units == 'imperial')?`${active}`:'' } onClick={ ()=>{ setUnit('imperial', city, appid); } }><i className={` ${wi} ${wi_fahrenheit} `}/></a></div>
                    </div>
                    <div className={WEATHER_ICON}>
                        {weatherIcon}
                    </div>
                </div>
                <div className={MID_CONTAINER}>
                    <div className={TEMPERATURE}>
                        {temp}{this.renderUnits(units)}
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

    // onChange(e) {
    //     const {getWeatherByCity, getCurrentCityWeather, setCity, units, appid} = this.props;
    //     setCity(e.target.value);
    //
    //     if (e.target.value !== '') {
    //         getWeatherByCity(e.target.value, units, appid);
    //     } else {
    //         getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units, appid);
    //     }
    // }
    

    componentWillMount(){
        const {getPosition, getWeatherByCity, position, city, units, appid} = this.props;

        if (!position && !city) {
            getPosition(units, appid);
        } else {
            getWeatherByCity(city, units, appid);
        }
    }

    render() {
        const {weather, width, height} = this.props;

        return (
            <div className={ROOT}>
                <div className={`${WIDGETS_CONTAINER}`}>
                    <div className={`${WIDGET_CARD}`} style={{width: width, height: height}}>
                        {this.renderWeather(weather)}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidgetToday;
