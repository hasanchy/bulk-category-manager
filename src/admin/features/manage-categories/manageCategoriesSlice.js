import { createSlice } from '@reduxjs/toolkit';

export const manageCategoriesSlice = createSlice({
	name: 'manageCategories',
	initialState: {
		manageCategoriesType: 'type-select', //type-select, merge-categories
		manageCategoriesStepIndex: 0
	},
	reducers: {
		setManageCategoriesType: (state, action) => {
			state.manageCategoriesType = action.payload;
		},
		setManageCategoriesStepNext: (state, action) => {
			state.manageCategoriesStepIndex += 1;
		},
		setManageCategoriesStepBack: (state, action) => {
			state.manageCategoriesStepIndex -= 1;
		},
		setManageCategoriesStepIndex: (state, action) => {
			state.manageCategoriesStepIndex = action.payload;
		},
	},
	extraReducers: (builder) => {
		
	}
})

// Action creators are generated for each case reducer function
export const {setManageCategoriesType, setManageCategoriesStepNext, setManageCategoriesStepBack, setManageCategoriesStepIndex} = manageCategoriesSlice.actions

export default manageCategoriesSlice.reducer