import React, { useState } from 'react';
import { BASE_URL } from '../constants';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
import photoService from '../services/photoService';
import { FaStar } from 'react-icons/fa';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';

function groupByDate(photos) {
    return photos.reduce((acc, photo) => {
        const date = new Date(photo.createdAt).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(photo);
        return acc;
    }, {});
}

function SearchResults({ results }) {
    const { triggerUpdate } = usePhotoUpdate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const groupedPhotos = groupByDate(results);

    const handleImageClick = (photo) => {
        setSelectedPhoto({
            ...photo,
            imageUrl: `${BASE_URL}/uploads/${photo.path}`
        });
    };

    const handleFavorite = async () => {
        try {
            await photoService.toggleFavorite(selectedPhoto._id);
            setSelectedPhoto(null);
            triggerUpdate();
        } catch (err) {
            console.error("Error toggling favorite", err);
        }
    };

    const handleTrash = async () => {
        try {
            await photoService.trashPhoto(selectedPhoto._id);
            setSelectedPhoto(null);
            triggerUpdate();
        } catch (err) {
            console.error("Error moving to trash", err);
        }
    };

    return (
        <div>
            {Object.entries(groupedPhotos)?.length > 0 ? (
                Object.entries(groupedPhotos).map(([date, photos]) => (
                    <div key={date} className="photo-group mt-5">
                        <div className="flex mt-4 mb-15 flex-wrap gap-4">
                            {photos.map(photo => (
                                <div className="relative inline-block" key={photo._id}>
                                    <img
                                        className="w-[200px] cursor-pointer shadow rounded h-full"
                                        src={`${BASE_URL}/uploads/${photo.path}`}
                                        alt={photo.title}
                                        onClick={() => handleImageClick(photo)}
                                    />
                                    <div className="absolute inset-0 bg-black/10 bg-opacity-30 rounded pointer-events-none"></div>
                                    {photo.isFavorite && (
                                        <FaStar
                                            className="absolute bottom-2 left-2 text-3xl text-yellow-300 shadow-2xl"
                                            title="Favorite"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No matching photos found</p>
            )}

            {selectedPhoto && (
                <PhotoPreviewModal
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onFavorite={handleFavorite}
                    onTrash={handleTrash}
                />
            )}
        </div>
    );
}

export default SearchResults;
