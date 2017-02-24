import * as types from "../constant";

const initialState = {
  position: null,
  weatherForecast: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_POSITION_DATA:
      return {...state, position: action.payload};
    case types.GET_WEATHER_FORECAST_DATA:
      return {...state, weatherForecast: action.payload};
    default:
      return state;
  }
}
