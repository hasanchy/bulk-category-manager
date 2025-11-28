import { createSlice } from '@reduxjs/toolkit';
import { moveProductCategories } from '../../services/apiService';

const initialState = {
    categoryMoverStepIndex: 1,
    sourceCategoryIds: [],
    destinationCategoryIds: [],
    actionMode: 'move',
    isProductCategoriesMoving: false
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
    },
    extraReducers: (builder) => {
		builder.addCase(moveProductCategories.pending, (state) => {
			state.isProductCategoriesMoving = true;
		}),
		builder.addCase(moveProductCategories.fulfilled, (state, action) => {
			state.isProductCategoriesMoving = false;
		}),
		builder.addCase(moveProductCategories.rejected, (state, action) => {
			state.isProductCategoriesMoving = false;
		});
	}
});

export const { setCategoryMoverStepIndex, setSourceCategoryIds, setDestinationCategoryIds, setActionMode } = categoryMoverSlice.actions
export default categoryMoverSlice.reducer;