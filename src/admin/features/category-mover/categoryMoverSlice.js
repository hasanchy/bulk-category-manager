import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryMoverStepIndex: 1,
    sourceCategoryIds: [],
    destinationCategoryIds: [],
    actionMode: 'move'
}

export const categoryMoverSlice = createSlice({
    name: 'categoryMover',
    initialState,
    reducers: {
        setCategoryMoverStepIndex: (state, action) => {
            state.categoryMoverStepIndex = action.payload;
        },
        setSourceCategoryIds: (state, action) => {
            state.sourceCategoryIds = action.payload
        },
        setDestinationCategoryIds: (state, action) => {
            state.destinationCategoryIds = action.payload
        },
        setActionMode: (state, action) => {
            state.actionMode = action.payload
        }
    }
})

export const { setCategoryMoverStepIndex, setSourceCategoryIds, setDestinationCategoryIds, setActionMode } = categoryMoverSlice.actions
export default categoryMoverSlice.reducer;