import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,  Switch } from 'react-router-dom'

import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/regirter/register'
import Info from './container/info/info'
import AuthRoute from './component/authroute/authroute'
import Change from './component/change/change'
// import AuthRoute from  './component/authroute/authroute'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    //redux调试
    window.devToolsExtension ? window.devToolsExtension() : f => f

))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>

            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/info' component={Info}></Route>
                    <Route path='/change' component={Change}></Route>
                </Switch>
            </div>

        </BrowserRouter>
    </Provider>, document.getElementById('root'));