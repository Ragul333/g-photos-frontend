import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import photoService from '../services/photoService';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';

function Trash() {
    const [trash, setTrash] = useState([]);

    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    async function fetchAlltrash() {
        try {
            const response = await photoService.getPhotosFromTrash();
            setTrash(response.data)
        } catch (err) {
            console.error(err.message || 'Error fetching trash')
        }
    }


    useEffect(() => {
        fetchAlltrash()
    }, [updatedAt]);

    const handleImageClick = (photo) => {
        setSelectedPhoto({
            ...photo,
            imageUrl: `${BASE_URL}/uploads/${photo.path}`
        });
    };

    const handleRestore = async () => {
        try {
            await photoService.restorePhoto(selectedPhoto._id);
            setSelectedPhoto(null);
            triggerUpdate();
        } catch (err) {
            console.error("Error while restoring : ", err);
        }
    }

    return (
        <div>
            {Object.entries(trash)?.length > 0 ? Object.entries(trash).map(([time, photos]) => (
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
                : <p>Trash Empty</p>
            }

            {selectedPhoto && (
                <PhotoPreviewModal
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onFavorite={() => { }}
                    onTrash={() => { }}
                    onRestore={handleRestore}
                    isRestore={true}
                />
            )}
        </div>
    );
}

export default Trash;
