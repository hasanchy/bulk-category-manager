import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../app/manuSlice";
import categoryMoverSlice from '../features/category-mover/categoryMoverSlice';
import moveProductsSlice from '../features/bulk-actions/move-products/moveProductsSlice';
import bulkActionsSlice from '../features/bulk-actions/bulkActionsSlice';
import categoriesSlice from '../components/categories/categoriesSlice';

const store = configureStore({
	reducer: {
		menu: menuReducer,
		categories: categoriesSlice,
		categoryMover: categoryMoverSlice,
		moveProducts: moveProductsSlice,
		bulkActions: bulkActionsSlice
	},
})

export default store;