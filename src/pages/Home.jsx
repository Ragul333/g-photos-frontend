import React, { useEffect, useState } from 'react';
import photoService from '../services/photoService';
import { BASE_URL } from '../constants';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
import { FaRegStar, FaStar } from 'react-icons/fa';
import favoriteService from '../services/favoriteService';
import { renderSkeleton } from '../components/Skeleton';

function Home() {
    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchAllPhotos() {
        try {
            setLoading(true);
            const response = await photoService.getAllPhotos();
            setPhotos(response.data);
        } catch (err) {
            console.error(err.message || 'Error fetching photos');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllPhotos();
    }, [updatedAt]);

    const handleImageClick = (photo) => {
        setSelectedPhoto({
            ...photo,
            imageUrl: `${BASE_URL}/uploads/${photo.path}`
        });
    };

    const handleFavorite = async () => {
        try {
            await favoriteService.toggleFavorite(selectedPhoto._id);
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
            {loading ? (
                <>
                    {renderSkeleton()}
                    {renderSkeleton()}
                </>
            ) : Object.entries(photos)?.length > 0 ? (
                Object.entries(photos).map(([time, photos]) => (
                    <div key={time} className="photo-group mt-5">
                        <h3 className='text-lg'>{time}</h3>
                        <div className="flex mt-4 mb-15 flex-wrap gap-4">
                            {photos.map(photo => (
                                <div key={photo._id} className="relative inline-block">
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
                <p className="text-gray-500 mt-5">No photos</p>
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

export default Home;
