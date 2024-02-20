import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userdataSlice'
import categoryReducer from './features/categories/categorySlice'


export const makeStore = () => {
    return configureStore( {
        reducer: {
            userData: userReducer,
            categories: categoryReducer
        }
    } )
}