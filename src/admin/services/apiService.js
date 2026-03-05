import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { __ } from '@wordpress/i18n';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (params, { rejectWithValue }) => {
	try {
		const res = await axios.get(bulkcatmanData.restEndpoint.categories, {
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': bulkcatmanData.restNonce
			}
		});
		return res.data;
	} catch (error) {
		console.error(__('Error fetching categories:', 'bulk-category-manager'), error); // Add this line for debugging
		return rejectWithValue(error.response.data);
	}
});

export const createCategory = async (categoryData) => {
	try {
		const response = await axios.post(bulkcatmanData.restEndpoint.categories, categoryData, {
			headers: {
				'Content-Type': 'application/json',
				'X-WP-NONCE': bulkcatmanData.restNonce
			}
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to create category');
	}
};

export const moveProductCategories = createAsyncThunk('categories/move', async (data, { rejectWithValue }) => {
	try {
		const res = await axios.post(
			`${bulkcatmanData.restEndpoint.categories}/move`,
			data,
			{
				headers: {
					'content-type': 'application/json',
					'X-WP-NONCE': bulkcatmanData.restNonce
				}
			}
		);
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});