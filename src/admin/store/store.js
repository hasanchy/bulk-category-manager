import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../app/manuSlice";
import categoryMoverSlice from '../features/category-mover/categoryMoverSlice';
import manageCategoriesSlice from '../features/manage-categories/manageCategoriesSlice';
import categoriesSlice from '../components/categories/categoriesSlice';

const store = configureStore({
	reducer: {
		menu: menuReducer,
		categories: categoriesSlice,
		categoryMover: categoryMoverSlice,
		manageCategories: manageCategoriesSlice
	},
})

export default store;