import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import photoService from '../services/photoService';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';

function Favorites() {

    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [favorites, setFavorites] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    async function fetchAllfavorites() {
        try {
            const response = await photoService.getAllFavorites();
            setFavorites(response.data)
        } catch (err) {
            console.error(err.message || 'Error fetching favorites')
        }
    }


    useEffect(() => {
        fetchAllfavorites()
    }, [updatedAt]);

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
            {Object.entries(favorites)?.length > 0 ? Object.entries(favorites).map(([time, photos]) => (
                <div key={time} className="photo-group mt-5">
                    <h3>{time}</h3>
                    <div className="flex">
                        {photos.map(photo => (
                            <img
                                key={photo._id}
                                className='w-[200px] mr-4 cursor-pointer'
                                src={`${BASE_URL}/uploads/${photo.path}`}
                                alt={photo.title}
                                onClick={() => handleImageClick(photo)}
                            />
                        ))}
                    </div>
                </div>
            ))
                : <p>Add some favorites</p>
            }

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
