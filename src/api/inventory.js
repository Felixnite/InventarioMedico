import axios from 'axios';

export const inventoryAPI = {
    createItem: async (itemData) => {
        try {
            const response = await axios.post('/api/inventory', itemData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Item creation failed');
        }
    },
    getAllItems: async () => {
        try {
            const response = await axios.get('/api/inventory', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to load inventory');
        }
    }
};