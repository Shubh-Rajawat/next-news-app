import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userdataSlice'
import categoryReducer from './features/categories/categorySlice'
import drawerReducer from './features/drawer/drawerSlice'
import readReducer from './features/post/readSlice'


export const makeStore = () => {
    return configureStore( {
        reducer: {
            userData: userReducer,
            categories: categoryReducer,
            drawerOpen: drawerReducer,
            read_id: readReducer,
        }
    } )
}