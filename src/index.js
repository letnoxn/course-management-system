import React from 'react';
import ReactDOM from 'react-dom';

import {createStire,applymiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import './index.css';
import Login from './container/login/login.js';
import AuthRoute from  './component/authroute/authroute'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    //redux调试
    window.devToolsExtension ? window.devToolsExtension() : f => f

))

ReactDOM.render(

    <Provider store={store} >
        <BrowserRouter>

            <div>
                <AuthRoute></AuthRoute>
                
            </div>

        </BrowserRouter>




    </Provider>, document.getElementById('root'));