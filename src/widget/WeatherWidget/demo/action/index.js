import axios from "axios";
import * as types from "../constant";

import {
    API,
    APPID
} from '../config';

export function getPosition(units) {
    return dispatch => {
        const request = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        request.then((position) => {
            sessionStorage.setItem('lat', position.coords.latitude);
            sessionStorage.setItem('lon', position.coords.longitude);
            dispatch({
                type: types.GET_POSITION_DATA,
                payload: position.coords
            });

            if (sessionStorage.getItem('city')) {
                dispatch( getWeatherByCity(sessionStorage.getItem('city'), units) );
                dispatch( getWeatherForecastByCity(sessionStorage.getItem('city'), units) );
                dispatch( getWeatherDailyByCity(sessionStorage.getItem('city'), units) );
            } else {
                dispatch( getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units) );
                dispatch( getWeatherForecastByCord(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units) );
                dispatch( getWeatherDailyByCord(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units) );
            }


        })
            .catch((err) => {
                console.error(err.message);
            });
    }
}

export function getCurrentCityWeather(lat, lon, units) {
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

export function getWeatherDailyByCity(city, units) {
    return dispatch => {
        const request = axios.get(`${API}/forecast/daily${APPID}&q=${city}&units=${units}`);
        request
            .then(({data}) => {
                dispatch({
                    type: types.GET_WEATHER_DAILY_DATA,
                    payload: data
                });
            })
            .catch(({response}) => {
                console.log(response);
            })
    }
}

export function getWeatherDailyByCord(lat, lon, units) {
    return dispatch => {
        const request = axios.get(`${API}/forecast/daily${APPID}&lat=${lat}&lon=${lon}&units=${units}`);
        request
            .then(({data}) => {
                dispatch({
                    type: types.GET_WEATHER_DAILY_DATA,
                    payload: data
                });
            })
            .catch(({response}) => {
                console.log(response);
            })
    }
}

export function getWeatherForecastByCord(lat, lon, units) {
    return dispatch => {
        const request = axios.get(`${API}/forecast${APPID}&lat=${lat}&lon=${lon}&units=${units}`);
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

export function getWeatherForecastByCity(city,units) {
    return dispatch => {
        const request = axios.get(`${API}/forecast${APPID}&q=${city}&units=${units}`);
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


export function setUnit(units) {
    return dispatch => {
        dispatch({
            type: types.SET_UNIT,
            payload: units
        });

        if (sessionStorage.getItem('city')) {
            dispatch( getWeatherByCity(sessionStorage.getItem('city'), units) );
            dispatch( getWeatherForecastByCity(sessionStorage.getItem('city'), units) );
        } else {
            dispatch( getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units) );
            dispatch( getWeatherForecastByCord(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units) );
        }

    }
}

export function setCity(city) {
    return dispatch => {
        dispatch({
            type: types.SET_CITY,
            payload: city
        });

        sessionStorage.setItem('city', city);
    }
}
