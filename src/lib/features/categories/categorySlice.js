const { createSlice } = require( "@reduxjs/toolkit" );


const initialState = {
    categories: null
}

const categorySlice = createSlice( {
    name: 'userdata',
    initialState,
    reducers: {
        setCategories( state, action ) {
            state.categories = action.payload
        },

    }
} )

export const { setCategories } = categorySlice.actions
const categoryReducer = categorySlice.reducer;
export default categoryReducer