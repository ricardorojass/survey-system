import React from "react";
import { render } from 'react-dom';
import App from "./App";
import {enableMapSet} from "immer"

enableMapSet()

render(<App />, document.getElementById('app'));
