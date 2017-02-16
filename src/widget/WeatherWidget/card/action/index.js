import axios from "axios";
import * as types from "../constant";

import {
    API,
    APPID
} from '../config';

export function getPosition(options) {
    return dispatch => {
        const request = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });

        request.then((position) => {
            sessionStorage.setItem('lat', position.coords.latitude);
            sessionStorage.setItem('lon', position.coords.longitude);
            dispatch({
                type: types.GET_POSITION_DATA,
                payload: position.coords
            });

            dispatch(getCurrentCityWeather(position.coords.latitude, position.coords.longitude));

        })
            .catch((err) => {
                console.error(err.message);
            });
    }
}

export function getCurrentCityWeather(lat, lon, units='metric') {
    return dispatch => {
        const request = axios.get(`${API}/weather${APPID}&lat=${lat}&lon=${lon}&units=${units}`);
        request
            .then(({data}) => {
                dispatch({
                    type: types.GET_WEATHER_DATA,
                    payload: data
                });
            })
            .catch(({response}) => {
                console.log(response);
            })
    }
}

export function getWeatherByCity(city,units) {
  return dispatch => {
    const request = axios.get(`${API}/weather${APPID}&q=${city}&units=${units}`);
    request
      .then(({data}) => {
          dispatch({
              type: types.GET_WEATHER_DATA,
              payload: data
          });
      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}

export function getWeatherForecast(city,units) {
    return dispatch => {
        const request = axios.get(`${API}forecast${APPID}&q=${city}&units=${units}`);
        request
            .then(({data}) => {
                dispatch({
                    type: types.GET_WEATHER_FORECAST_DATA,
                    payload: data
                });
            })
            .catch(({response}) => {
                console.log(response);
            })
    }
}
