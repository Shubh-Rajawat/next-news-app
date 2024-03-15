const { createSlice } = require( "@reduxjs/toolkit" );


const initialState = {
    loginToast: false
}

const toastSlice = createSlice( {
    name: 'toast',
    initialState,
    reducers: {
        setLoginToast( state, action ) {
            state.loginToast = action.payload
        },
    }
} )


export const { setLoginToast } = toastSlice.actions
const toastReducer = toastSlice.reducer;
export default toastReducer