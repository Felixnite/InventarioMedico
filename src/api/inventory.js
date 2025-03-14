import axios from 'axios';

export const inventoryAPI = {
    getAllItems: async () => {
        try {
            const response = await fetch('/api/inventory');
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch items');
        }
    },
    createItem: async (data) => {
        try {
            const response = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error.message); // Add logging
            throw error;
        }
    }
};