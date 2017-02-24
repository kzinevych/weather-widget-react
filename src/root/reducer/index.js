import {combineReducers} from "redux";

import {weatherDemo, weatherToday, weatherForecast, weatherDaily} from '../../widget';

const rootReducer = combineReducers({
    weatherDemo,
    weatherToday,
    weatherForecast,
    weatherDaily
});

export default rootReducer;
