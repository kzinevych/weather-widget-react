import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducer";
import {
    weather
} from '../../widget';

const createStoreWithMiddleware = process.env.__DEV__
    ?
    applyMiddleware(thunkMiddleware, logger())(createStore)
    :
    applyMiddleware(thunkMiddleware)(createStore);

export default function (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
