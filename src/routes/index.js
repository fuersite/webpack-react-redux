import React from 'react';
import {BrowserRouter,Route,Switch } from 'react-router-dom'

import Index from '@/components/index'
import Home from '@/components/home'

export default class Router extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/home" component={Home}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}