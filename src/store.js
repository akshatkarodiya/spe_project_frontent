// import { configureStore,combineReducers,compose,applyMiddleware } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { bookListReducer } from "./reducer/bookReducer";

import thunk from 'redux-thunk';

const initialState={};
const reducer = combineReducers({
    bookList: bookListReducer,

})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;
