import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import Router from '@/routes/index'; //路由配置
import store from '@/store/index'

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('app')
);