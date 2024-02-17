const { createSlice } = require( "@reduxjs/toolkit" );

const initialState = {
    userId: null,
    userData: null,
}

const userdateSlice = createSlice( {
    name: 'userdata',
    initialState,
    reducers: {
        setUserData( state, action ) {
            console.log( action.payload )
        },
        setUserId( state, action ) {
            state.userId = action.payload;
            // console.log( "from Redux ID", action.payload )
        },
    }
} )

export const { setUserData, setUserId } = userdateSlice.actions
const userReducer = userdateSlice.reducer;
export default userReducer