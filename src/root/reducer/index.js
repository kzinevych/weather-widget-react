import {combineReducers} from "redux";

import {weatherDemo, weatherToday, weatherForecast} from '../../widget';

const rootReducer = combineReducers({
    weatherDemo,
    weatherToday,
    weatherForecast
});

export default rootReducer;
