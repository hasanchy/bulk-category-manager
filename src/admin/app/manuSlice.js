import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeTab: 'dashboard', // categoryMover, settings
}

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
	}
})

export const { setActiveTab } = menuSlice.actions
export default menuSlice.reducer;