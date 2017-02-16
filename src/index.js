//----------------CSS-----------------------//
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../private/style.css'
//-----------------JS-----------------------//
import React from "react";
import DOM from "react-dom";
import ReactPerf from "react-addons-perf";
import injectTapEventPlugin from "react-tap-event-plugin";
import Root from "./root/container/index.js";
import "./favicon.ico";

window.Perf = ReactPerf;

injectTapEventPlugin();

DOM.render(<Root/>, document.getElementById('root'));