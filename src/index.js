import 'core-js';
import 'raf/polyfill';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store/ConfigureStore.js'
import App from './containers/App.js'

import './styles/index.css'

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    target
);



