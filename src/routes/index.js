import React, { Suspense, lazy } from 'react';
import {BrowserRouter,Route,Switch } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'));
const Index = lazy(() => import('@/views/index'));
export default class Router extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                            <Route path="/" exact component={Index}></Route>
                            <Route path="/home" component={Home}></Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}