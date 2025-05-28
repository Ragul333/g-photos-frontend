import api from "../api/api";


const getAllPhotos = async () => {
    const response = await api.get('/photos');
    return response.data;
};

const uploadPhoto = async (form) => {
    const formData = new FormData();
    formData.append('file', form?.file);
    formData.append('title', form?.title);
    formData.append('description', form?.description);

    const response = await api.post('/photos/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const getAllFavorites = async () => {
    const response = await api.get("/photos/favorites");
    return response.data;
}

const getPhotosFromTrash = async () => {
    const response = await api.get("/photos/trash");
    return response.data;
}

const toggleFavorite = async (id) => {
    await api.put(`/photos/favorite/${id}`)
}

const trashPhoto = async (id) => {
    await api.put(`/photos/trash/${id}`)
}

const restorePhoto = async (id) => {
    await api.put(`/photos/restore/${id}`)
}

export default {
    getAllPhotos,
    uploadPhoto,
    getAllFavorites,
    getPhotosFromTrash,
    toggleFavorite,
    trashPhoto,
    restorePhoto
};


