import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { __ } from '@wordpress/i18n';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (params, { rejectWithValue }) => {
	try {
		const res = await axios.get(bulkprodmovData.restEndpoint.categories, {
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': bulkprodmovData.restNonce
			}
		});
		return res.data;
	} catch (error) {
		console.error(__('Error fetching categories:', 'bulk-product-category-mover-for-woocommerce'), error); // Add this line for debugging
		return rejectWithValue(error.response.data);
	}
});

export const createCategory = async (categoryData) => {
	try {
		const response = await axios.post(bulkprodmovData.restEndpoint.categories, categoryData, {
			headers: {
				'Content-Type': 'application/json',
				'X-WP-NONCE': bulkprodmovData.restNonce
			}
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to create category');
	}
};