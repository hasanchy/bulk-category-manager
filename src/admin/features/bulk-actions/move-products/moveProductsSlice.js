import { createSlice } from '@reduxjs/toolkit';
import { moveProductCategories } from '../../../services/apiService';

const initialState = {
    moveProductsStepIndex: 2,
    sourceCategoryIds: [],
    targetCategoryIds: [],
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
        setMoveProductsStepIndex: (state, action) => {
            state.moveProductsStepIndex = action.payload;
        },
        setSourceCategoryIds: (state, action) => {
            state.sourceCategoryIds = action.payload
        },
        setTargetCategoryIds: (state, action) => {
            state.targetCategoryIds = action.payload
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

export const { setMoveProductsStepIndex, setSourceCategoryIds, setTargetCategoryIds, setActionMode, setTotalToMoveCount, setTotalMovedCount, setIsProductMovingStopping, setIsProductCategoriesMoving } = moveProductsSlice.actions
export default moveProductsSlice.reducer;