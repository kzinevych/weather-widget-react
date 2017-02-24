import React, { Component } from 'react';

import {
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

} from '../../scss/root.scss';

export function getWeatherIcon(weatherIconId) {
    switch (weatherIconId) {
        case '01d':
            return <i className={`${wi} ${wi_day_sunny}`}/>;
            break;
        case '02d':
            return <i className={`${wi} ${wi_day_cloudy}`}/>;
            break;
        case '03d':
            return <i className={`${wi} ${wi_cloud}`}/>;
            break;
        case '04d':
            return <i className={`${wi} ${wi_cloudy}`}/>;
            break;
        case '09d':
            return <i className={`${wi} ${wi_showers}`}/>;
            break;
        case '10d':
            return <i className={`${wi} ${wi_day_rain}`}/>;
            break;
        case '11d':
            return <i className={`${wi} ${wi_day_thunderstorm}`}/>;
            break;
        case '13d':
            return <i className={`${wi} ${wi_day_snow}`}/>;
            break;
        case '50d':
            return <i className={`${wi} ${wi_fog}`}/>;
            break;
        case '01n':
            return <i className={`${wi} ${wi_night_clear}`}/>;
            break;
        case '02n':
            return <i className={`${wi} ${wi_night_alt_cloudy}`}/>;
            break;
        case '03n':
            return <i className={`${wi} ${wi_night_cloudy}`}/>;
            break;
        case '04n':
            return <i className={`${wi} ${wi_cloudy}`}/>;
            break;
        case '09n':
            return <i className={`${wi} ${wi_night_showers}`}/>;
            break;
        case '10n':
            return <i className={`${wi} ${wi_night_rain}`}/>;
            break;
        case '11n':
            return <i className={`${wi} ${wi_night_thunderstorm}`}/>;
            break;
        case '13n':
            return <i className={`${wi} ${wi_night_snow}`}/>;
            break;
        case '50n':
            return <i className={`${wi} ${wi_fog}`}/>;
            break;
    }
}