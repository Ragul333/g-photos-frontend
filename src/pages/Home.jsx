import React, { useEffect, useState } from 'react';
import photoService from '../services/photoService';
import { BASE_URL } from '../constants';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';

function Home() {
    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    async function fetchAllPhotos() {
        try {
            const response = await photoService.getAllPhotos();
            setPhotos(response.data);
        } catch (err) {
            console.error(err.message || 'Error fetching photos');
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
            {Object.entries(photos)?.length > 0 ? Object.entries(photos).map(([time, photos]) => (
                <div key={time} className="photo-group mt-5">
                    <h3 className='text-lg'>{time}</h3>
                    <div className="flex mt-4 mb-15 flex-wrap gap-4">
                        {photos.map(photo => (
                            <img
                                key={photo._id}
                                className='w-[200px] cursor-pointer rounded-lg shadow'
                                src={`${BASE_URL}/uploads/${photo.path}`}
                                alt={photo.title}
                                onClick={() => handleImageClick(photo)}
                            />
                        ))}
                    </div>
                </div>
            )) : <p>No photos</p>}

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
