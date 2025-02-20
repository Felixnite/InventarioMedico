import axios from 'axios';

export const inventoryAPI = {
    createItem: async (itemData) => {
        try {
            const response = await axios.post('/api/inventory', itemData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error creating item');
        }
    },

    getAllItems: async () => {
        try {
            const response = await axios.get('/api/inventory');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error fetching inventory');
        }
    }
};