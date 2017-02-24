import axios from "axios";
import * as types from "../constant";

import {
    API
} from '../config';

export function getPosition(units, appid) {
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
                dispatch( getWeatherByCity(sessionStorage.getItem('city'), units, appid) );
            } else {
                dispatch( getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units, appid) );
            }


        })
            .catch((err) => {
                console.error(err.message);
            });
    }
}

export function getCurrentCityWeather(lat, lon, units, appid) {
    return dispatch => {
        const request = axios.get(`${API}/weather?appid=${appid}&lat=${lat}&lon=${lon}&units=${units}`);
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

export function getWeatherByCity(city, units, appid) {
  return dispatch => {
    const request = axios.get(`${API}/weather?appid=${appid}&q=${city}&units=${units}`);
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


export function setUnit(units, city, appid) {
    return dispatch => {
        dispatch({
            type: types.SET_UNITS,
            payload: units
        });

        let City = (sessionStorage.getItem('city'))?sessionStorage.getItem('city'):city;

        if (City) {
            dispatch( getWeatherByCity(City, units, appid) );
        } else {
            dispatch( getCurrentCityWeather(sessionStorage.getItem('lat'), sessionStorage.getItem('lon'), units, appid) );
        }

    }
}
