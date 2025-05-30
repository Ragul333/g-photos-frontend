import api from "../api/api";

const addPhotoToAlbum = async (photoId, albumId) => {
    await api.post(`/album-photos`, { photoId, albumId });
};

const removePhotoFromAlbum = async (photoId, albumId) => {
    await api.delete(`/album-photos`, {
        data: { photoId, albumId },
    });
};


export default {
    addPhotoToAlbum,
    removePhotoFromAlbum
}