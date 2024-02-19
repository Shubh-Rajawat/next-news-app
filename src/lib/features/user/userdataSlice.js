const { createSlice } = require( "@reduxjs/toolkit" );
import { getCookie } from 'cookies-next';
const d = getCookie( 'user_data' );
const data = d ? JSON.parse( d ) : null;

const initialState = {
    userId: null,
    userData: data ?? false,
    termId: null,
}

const userdateSlice = createSlice( {
    name: 'userdata',
    initialState,
    reducers: {
        setUserData( state, action ) {
            state.userData = action.payload
        },
        setUserId( state, action ) {
            state.userId = action.payload;
            // console.log( "from Redux ID", action.payload )
        },
        setTermId( state, action ) {
            state.termId = action.payload;
            // console.log( "from Redux ID", action.payload )
        },
    }
} )

export const { setUserData, setUserId, setTermId } = userdateSlice.actions
const userReducer = userdateSlice.reducer;
export default userReducer