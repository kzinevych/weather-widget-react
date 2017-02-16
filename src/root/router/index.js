import React from 'react';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import cookies from 'js-cookie';
import axios from 'axios';

import App from '../container/App';
import Home from '../container/Pages/Home';
import NotFound from '../container/Pages/NotFound';

export default (
    [
        <Router path='/' component={App}>
            <IndexRoute component={Home}/>
        </Router>,
        <Route path='*' component={NotFound}/>
    ]
);