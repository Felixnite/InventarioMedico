import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = '/api/inventory';

export const inventoryAPI = {
    createItem: async (itemData) => {
        try {
            const response = await axios.post(API_BASE_URL, itemData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error creating item';
            console.error('Create Item Error:', errorMessage);
            throw new Error(errorMessage);
        }
    },

    getAllItems: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error fetching inventory';
            console.error('Fetch Inventory Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }
};