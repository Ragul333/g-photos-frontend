import api from "../api/api";


const getAllPhotos = async () => {
    const response = await api.get('/photos');
    return response.data;
};

const uploadPhoto = async (forms) => {
    const formData = new FormData();

    forms.forEach((form, index) => {
        formData.append('files', form.file);
        formData.append(`titles[${index}]`, form.title || '');
        formData.append(`descriptions[${index}]`, form.description || '');
    });

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

const updatePhotoMetadata = async (photoId, { title, description, tags, albumId }) => {
    const body = {};
    if (title !== undefined) body.title = title;
    if (description !== undefined) body.description = description;
    if (tags !== undefined) body.tags = tags;         
    if (albumId !== undefined) body.albumId = albumId;

    try {
        const response = await api.patch(`/photos/${photoId}/metadata`, body);
        return response.data.data;  
    } catch (error) {
        console.error('Error updating photo metadata:', error.response?.data || error.message);
        throw error;
    }
}

const getPhotoMetadata = async (photoId) => {
    try {
        const response = await api.get(`/photos/${photoId}/metadata`);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching photo metadata:', error.response?.data || error.message);
        throw error;
    }
};


export default {
    getAllPhotos,
    uploadPhoto,
    getAllFavorites,
    getPhotosFromTrash,
    toggleFavorite,
    trashPhoto,
    restorePhoto,
    updatePhotoMetadata,
    getPhotoMetadata
};


