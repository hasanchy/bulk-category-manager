import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryMoverStepIndex: 1
}

export const categoryMoverSlice = createSlice({
    name: 'categoryMover',
    initialState,
    reducers: {
        setCategoryMoverStepIndex: (state, action) => {
            state.activeTab = action.payload;
        }
    }
})

export const { setCategoryMoverStepIndex } = categoryMoverSlice.actions
export default categoryMoverSlice.reducer;