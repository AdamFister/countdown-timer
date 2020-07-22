import { createStore, combineReducers } from 'redux';
import countdownReducer from './reducers/countdownReducer';

const reducer = combineReducers({ timerState: countdownReducer });

const initialState = {
    timerState: {
        testVariable: false,
        test2: "orange"
    },
};

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;