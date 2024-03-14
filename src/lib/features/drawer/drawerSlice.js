const { createSlice } = require( "@reduxjs/toolkit" );


const initialState = {
    open: true
}

const drawerSlice = createSlice( {
    name: 'drawer',
    initialState,
    reducers: {
        toggleOpen( state, action ) {
            state.open = action.payload
        },

    }
} )

export const { toggleOpen } = drawerSlice.actions
const drawerReducer = drawerSlice.reducer;
export default drawerReducer