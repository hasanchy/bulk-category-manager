import { createSlice } from '@reduxjs/toolkit';

export const bulkActionsSlice = createSlice({
	name: 'bulkActions',
	initialState: {
		bulkActionsType: 'type-select', //type-select, merge-categories
		bulkActionsStepIndex: 0
	},
	reducers: {
		setBulkActionsType: (state, action) => {
			state.bulkActionsType = action.payload;
		},
		setBulkActionsStepNext: (state, action) => {
			state.bulkActionsStepIndex += 1;
		},
		setBulkActionsStepBack: (state, action) => {
			state.bulkActionsStepIndex -= 1;
		},
		setBulkActionsStepIndex: (state, action) => {
			state.bulkActionsStepIndex = action.payload;
		},
	},
	extraReducers: (builder) => {
		
	}
})

// Action creators are generated for each case reducer function
export const {setBulkActionsType, setBulkActionsStepNext, setBulkActionsStepBack, setBulkActionsStepIndex} = bulkActionsSlice.actions

export default bulkActionsSlice.reducer