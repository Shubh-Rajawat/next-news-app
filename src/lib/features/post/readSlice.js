const { createSlice } = require( "@reduxjs/toolkit" );


const initialState = {
    read_id: null
}

const readSlice = createSlice( {
    name: 'read',
    initialState,
    reducers: {
        setRead_id( state, action ) {
            state.read_id = action.payload
        },
    }
} )

export const { setRead_id } = readSlice.actions
const readReducer = readSlice.reducer;
export default readReducer