import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../app/manuSlice";
import categoryMoverSlice from '../features/category-mover/categoryMoverSlice';

const store = configureStore({
	reducer: {
		menu: menuReducer,
		categoryMover: categoryMoverSlice
	},
})

export default store;