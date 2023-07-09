import {combineReducers, createStore} from "redux";
import user from "./reducer/user";
import products from "./reducer/products";
import filters from "./reducer/filters";
import cart from "./reducer/cart"
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    user,
    cart,
    products,
    filters
})

export const store = createStore(rootReducer, composeWithDevTools())