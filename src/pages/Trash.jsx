import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import photoService from '../services/photoService';
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import PhotoPreviewModal from '../components/PhotoPreviewModal';
import { renderSkeleton } from '../components/Skeleton';

function Trash() {
    const [trash, setTrash] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updatedAt, triggerUpdate } = usePhotoUpdate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    async function fetchAlltrash() {
        try {
            setLoading(true);
            const response = await photoService.getPhotosFromTrash();
            setTrash(response.data);
        } catch (err) {
            console.error(err.message || 'Error fetching trash');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAlltrash();
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
            console.error("Error while restoring: ", err);
        }
    };


    return (
        <div>
            {loading ? (
                <>
                    {renderSkeleton()}
                    {renderSkeleton()}
                </>
            ) : Object.entries(trash)?.length > 0 ? (
                Object.entries(trash).map(([time, photos]) => (
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
                <p className="text-gray-500 mt-5">Trash is empty</p>
            )}

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
