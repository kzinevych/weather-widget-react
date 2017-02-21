import * as types from "../constant";

const initialState = {
  position: null,
  weather: null,
  weatherForecast: null,
  unit: (sessionStorage.getItem('unit'))?sessionStorage.getItem('unit'):'metric',
  city: (sessionStorage.getItem('city'))?sessionStorage.getItem('city'):''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_POSITION_DATA:
      return {...state, position: action.payload};
    case types.GET_WEATHER_DATA:
      return {...state, weather: action.payload};
    case types.GET_WEATHER_FORECAST_DATA:
      return {...state, weatherForecast: action.payload};
    case types.SET_UNIT:
      return {...state, unit: action.payload};
    case types.SET_CITY:
      return {...state, city: action.payload};
    default:
      return state;
  }
}
