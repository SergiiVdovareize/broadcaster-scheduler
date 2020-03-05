import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from './reducers'
// import weatherReducer from './reducers/weatherReducer'

const rootElement = document.getElementById('root')
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
