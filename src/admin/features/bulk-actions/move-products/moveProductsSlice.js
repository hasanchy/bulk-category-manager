import { createSlice } from '@reduxjs/toolkit';
import { moveProductCategories } from '../../services/apiService';

const initialState = {
    moveProductsStepIndex: 1,
    sourceCategoryIds: [],
    destinationCategoryIds: [],
    actionMode: 'move',
    isProductCategoriesMoving: false,
    isMovingApiRequestInProgress: false,

    totalToMoveCount: 0,
    totalMovedCount: 0,
    isProductMovingStopping: false
}

export const moveProductsSlice = createSlice({
    name: 'moveProducts',
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
        },
        setTotalToMoveCount: (state, action) => {
            state.totalToMoveCount = action.payload
        },
        setTotalMovedCount: (state, action) => {
            state.totalMovedCount = action.payload
        },
        setIsProductMovingStopping: (state, action) => {
            state.isProductMovingStopping = action.payload
        },
        setIsProductCategoriesMoving: (state, action) => {
            state.isProductCategoriesMoving = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(moveProductCategories.pending, (state) => {
            state.isMovingApiRequestInProgress = true;
        }),
        builder.addCase(moveProductCategories.fulfilled, (state, action) => {
            state.isMovingApiRequestInProgress = false;
        }),
        builder.addCase(moveProductCategories.rejected, (state, action) => {
            state.isMovingApiRequestInProgress = false;
        });
    }
});

export const { setCategoryMoverStepIndex, setSourceCategoryIds, setDestinationCategoryIds, setActionMode, setTotalToMoveCount, setTotalMovedCount, setIsProductMovingStopping, setIsProductCategoriesMoving } = categoryMoverSlice.actions
export default categoryMoverSlice.reducer;