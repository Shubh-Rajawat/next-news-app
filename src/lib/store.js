import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userdataSlice'


export const makeStore = () => {
    return configureStore( {
        reducer: {
            userData: userReducer
        }
    } )
}