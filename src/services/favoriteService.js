import api from "../api/api";

const getAllFavorites = async () => {
    const response = await api.get("/favorites");
    return response.data;
};

const toggleFavorite = async (photoId) => {
    await api.put(`/favorites/${photoId}`);
};

export default {
    getAllFavorites,
    toggleFavorite
}