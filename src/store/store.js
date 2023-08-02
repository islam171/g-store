import {combineReducers, createStore} from "redux";
import user from "./reducer/user";
import products from "./reducer/products";
import filters from "./reducer/filters";
import cart from "./reducer/cart"
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}


const rootReducer = combineReducers({
    user,
    cart,
    products,
    filters
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)