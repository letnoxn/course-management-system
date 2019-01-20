import React from 'react';
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

// import reducers from './reducer'
import Login from './container/login/login.js';
// import AuthRoute from  './component/authroute/authroute'


//const store = createStore(reducers, compose(
  //  applyMiddleware(thunk),
    //redux调试
 //   window.devToolsExtension ? window.devToolsExtension() : f => f

//))

ReactDOM.render(

    
        <BrowserRouter>

            <div>
            
                <Route path='/login' component={Login}></Route>
                
            </div>

        </BrowserRouter>


   , document.getElementById('root'));