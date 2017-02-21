import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

// Actions
import {getPosition, getCurrentCityWeather, getWeatherByCity, getWeatherDailyByCity, getWeatherDailyByCord, getWeatherForecastByCity, setUnit, setCity} from '../action';

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
    COLUMN,
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

@connect( ({position, weather, weatherDaily, weatherForecast, unit, city}) => ({...position, ...weather, ...weatherDaily, ...weatherForecast, ...unit, ...city}), {getPosition, getCurrentCityWeather, getWeatherByCity, getWeatherDailyByCity, getWeatherDailyByCord, getWeatherForecastByCity, setUnit, setCity} )

class WeatherWidget extends Component {
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

    renderTimeList(weatherDate) {
        let today = new Date(weatherDate);

        let hours = today.getHours();
        let minutes = (today.getMinutes() == 0)? '00' : today.getMinutes();

        return (
            <div className={WEATHER_LIST_DATE}>
                <div>{hours}:{minutes}</div>
            </div>
        );
    }

    renderUnits(unit) {
        if (unit == 'metric') {
            return <i className={` ${wi} ${wi_celsius} `}/>
        } else if (unit == 'imperial') {
            return <i className={` ${wi} ${wi_fahrenheit} `}/>
        }
    }

    renderWeather(weather) {
        const {setUnit, unit} = this.props;

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
                        <div className={CELSIUS}><a className={(this.state.isActiveCel)?`${active}`:''} onClick={ ()=>{ setUnit('metric'); this.state.isActiveCel = true; this.state.isActiveFah = false} }><i className={` ${wi} ${wi_celsius} `}/></a></div>
                        <div className={FAHRENHEIT}><a  className={(this.state.isActiveFah)?`${active}`:''} onClick={ ()=>{ setUnit('imperial'); this.state.isActiveCel = false; this.state.isActiveFah = true } }><i className={` ${wi} ${wi_fahrenheit} `}/></a></div>
                    </div>
                    <div className={WEATHER_ICON}>
                        {weatherIcon}
                    </div>
                </div>
                <div className={MID_CONTAINER}>
                    <div className={TEMPERATURE}>
                        {temp}{this.renderUnits(unit)}
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
        const {getWeatherByCity, getWeatherForecastByCity, getCurrentCityWeather, setCity, unit} = this.props;
        setCity(e.target.value);

        if (e.target.value !== '') {
            getWeatherByCity(e.target.value, unit);
            getWeatherForecastByCity(e.target.value, unit);
        } else {
            getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), unit);
        }
    }

    renderWeatherDaily(weatherDaily) {
        const {unit} = this.props;

        if (!weatherDaily)
            return (<Spinner/>);

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
                            <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_day_sunny}`}/> {weatherItem.temp.day}{this.renderUnits(unit)}</div>
                            <div className={`${WEATHER_LIST_UNIT}`}><i className={`${wi} ${wi_night_clear}`}/> {weatherItem.temp.night}{this.renderUnits(unit)}</div>
                        </div>
                        {this.renderDateList(weatherItem.dt)}
                    </div>
                )

            });
        }

        return (
            <div className={WEATHER_LIST}>
                {WeatherList}
            </div>
        )
    }

    renderWeatherForecast(weatherForecast) {
        const {unit} = this.props;

        if (!weatherForecast)
            return (<Spinner/>);

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
                                <div className={`${WEATHER_LIST_UNIT}`}>{weatherTemp}{this.renderUnits(unit)}</div>
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
                {WeatherList}
            </div>
        )
    }

    componentWillMount(){
        const {getPosition, position, unit} = this.props;
        if (!position)
            getPosition(unit);
    }

    render() {
        const {weather, weatherDaily, weatherForecast, city} = this.props;

        return (
            <div className={ROOT}>
                <input className={INPUT} type="text" name="city" placeholder="Enter City" value={city} onChange={ (e)=>{this.onChange(e)} }/>
                <div className={`${WIDGETS_CONTAINER}`}>
                    <h1 className={TITLE}>CURRENT WEATHER</h1>
                    <div className={`${WIDGET_CARD}`}>
                        {this.renderWeather(weather)}
                    </div>

                    <h1 className={TITLE}>DAILY WEATHER</h1>
                    <div className={`${WIDGET_DAILY}`}>
                        {this.renderWeatherDaily(weatherDaily)}
                    </div>

                    <h1 className={TITLE}>3 HOURS WEATHER</h1>
                    <div className={`${WIDGET_FORECAST}`}>
                        {this.renderWeatherForecast(weatherForecast)}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidget;
