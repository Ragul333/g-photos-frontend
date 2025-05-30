import api from "../api/api";

const updateTags = async (photoId, tags) => {
    try {
        const response = await api.put(`/tags/${photoId}`, {
            tags, 
        });
        return response.data;
    } catch (error) {
        console.error('Error updating tags:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    updateTags
}