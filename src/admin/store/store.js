import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../app/manuSlice";

const store = configureStore({
	reducer: {
		menu: menuReducer
	},
})

export default store;