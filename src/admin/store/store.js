import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../app/manuSlice";
import categoryMoverSlice from '../features/category-mover/categoryMoverSlice';
import categoriesSlice from '../components/categories/categoriesSlice';

const store = configureStore({
	reducer: {
		menu: menuReducer,
		categories: categoriesSlice,
		categoryMover: categoryMoverSlice
	},
})

export default store;