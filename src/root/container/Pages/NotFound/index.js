import React, {Component} from "react";
import {connect} from "react-redux";

// @connect(({page}) => ({...page}), {})

class NotFound extends Component {

    render() {
        return (
            <div>
                Not Found
            </div>
        )
    }
}

export default NotFound;

