import React, {Component} from "react";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "../store";
import routes from "../router";

const store = configureStore(process.env.__DEV__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {});


//onUpdate={() => window.scrollTo(0, 0)}

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}
                        routes={routes}
                />
            </Provider>
        )
    }
}

export default Root;