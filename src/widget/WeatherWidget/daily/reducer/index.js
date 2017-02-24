import * as types from "../constant";

const initialState = {
  position: null,
  weatherDaily: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_POSITION_DATA:
      return {...state, position: action.payload};
    case types.GET_WEATHER_DAILY_DATA:
      return {...state, weatherDaily: action.payload};
    default:
      return state;
  }
}
