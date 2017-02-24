import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

// Actions
import {getPosition, getWeatherDailyByCity, getWeatherDailyByCord, setUnit} from '../action';

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
    WIDGET_COLUMN,
    WIDGET_DAILY,
    WIDGET_FORECAST,
    WEATHER_LIST,
    WEATHER_LIST_ITEM,
    WEATHER_LIST_UNIT,
    WEATHER_LIST_DATE,
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

@connect( ({weatherDaily}) => ({...weatherDaily}), {getPosition, getWeatherDailyByCity, getWeatherDailyByCord} )

class WeatherWidgetDaily extends Component {
    static PropTypes = {
        appid: PropTypes.string.isRequired,
        city: PropTypes.string,
        units: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string
    };

    static defaultProps = {
        width: '100%',
        height: '307px'
    };
    
    constructor(props) {
        super(props);
    }
    
    renderDateList(weatherDate) {
        let today = new Date(weatherDate);

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

    renderWeatherDaily(weatherDaily) {
        const {units, appid} = this.props;

        if (!weatherDaily)
            return (<Spinner/>);

        let cityName = weatherDaily.city.name;
        let WeatherList;

        if (weatherDaily.cod == 200) {
            WeatherList = weatherDaily.list.map((weatherItem)=> {

                let weatherName = weatherItem.weather[0].main;
                let weatherIconId = weatherItem.weather[0].icon;
                let weatherIcon = getWeatherIcon(weatherIconId);
                
                return (
                    <div key={Math.random()} className={`${WEATHER_LIST_ITEM} ${animated} ${fadeIn}`}>
                        <div className={FLEX_COLUMN}>
                            <div className={`${WEATHER_LIST_UNIT}`}>{weatherIcon}</div>
                            <div className={`${WEATHER_LIST_UNIT}`}>{weatherName}</div>
                            <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_day_sunny}`}/> {weatherItem.temp.day}{this.renderUnits(units, appid)}</div>
                            <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_night_clear}`}/> {weatherItem.temp.night}{this.renderUnits(units, appid)}</div>
                        </div>
                        {this.renderDateList(weatherItem.dt)}
                    </div>
                )

            });
        }

        return (
            <div className={`${WEATHER_LIST} ${FLEX_COLUMN}`}>
                <div><h1>{cityName}</h1></div>
                <div className={FLEX_ROW}>{WeatherList}</div>
            </div>
        )
    }
    
    componentWillMount(){
        const {getPosition, getWeatherDailyByCity, position, city, units, appid} = this.props;

        if (!position && !city) {
            getPosition(units, appid);
        } else {
            getWeatherDailyByCity(city, units, appid);
        }
    }

    render() {
        const {weatherDaily, width, height} = this.props;

        return (
            <div className={ROOT}>
                <div className={`${WIDGETS_CONTAINER}`}>
                    <div className={`${WIDGET_DAILY}`} style={{width: width, height: height}}>
                        {this.renderWeatherDaily(weatherDaily)}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidgetDaily;
