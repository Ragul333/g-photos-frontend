import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import photoService from '../services/photoService';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
import favoriteService from '../services/favoriteService';
import { renderSkeleton } from '../components/Skeleton';

function Favorites() {
    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [favorites, setFavorites] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchAllfavorites() {
        try {
            setLoading(true);
            const response = await favoriteService.getAllFavorites();
            setFavorites(response.data);
        } catch (err) {
            console.error(err.message || 'Error fetching favorites');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllfavorites();
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
            ) : Object.entries(favorites)?.length > 0 ? (
                Object.entries(favorites).map(([time, photos]) => (
                    <div key={time} className="photo-group mt-5">
                        <h3 className='text-lg'>{time}</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {photos.map(photo => (
                                <img
                                    key={photo._id}
                                    className='w-[200px] cursor-pointer shadow rounded'
                                    src={`${BASE_URL}/uploads/${photo.path}`}
                                    alt={photo.title}
                                    onClick={() => handleImageClick(photo)}
                                />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-5">Add some favorites</p>
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

export default Favorites;
