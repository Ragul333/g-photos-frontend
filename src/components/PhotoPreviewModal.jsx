import { useRef, useState, useEffect } from "react";
import {
    FaRegStar,
    FaArrowLeftLong,
} from "react-icons/fa6";
import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import photoService from "../services/photoService";
import tagService from "../services/tagService";

export default function PhotoPreviewModal({ photo, onClose, onFavorite, onTrash, onRestore, isRestore }) {
    const [showInfo, setShowInfo] = useState(false);

    const [title, setTitle] = useState(photo?.title || "");
    const [description, setDescription] = useState(photo?.description || "");
    const [tags, setTags] = useState(photo?.tags || []); 

    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const imageContainerRef = useRef();


    useEffect(() => {
        setTitle(photo?.title || "");
        setDescription(photo?.description || "");
        setTags(photo?.tags || []);
        setError(null);
    }, [photo]);


    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setTagInput("");
        }
    };


    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSaveMetadata = async () => {
        setLoading(true);
        setError(null);

        try {

            const updatedPhoto = await photoService.updatePhotoMetadata(photo._id, {
                title,
                description,
            });


            await tagService.updateTags(photo._id, tags); // tags: array of strings

         
            setTitle(updatedPhoto.title || "");
            setDescription(updatedPhoto.description || "");
            alert("Photo metadata updated successfully!");

        } catch (err) {
            console.error(err);
            setError("Failed to update photo metadata. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchMetadata = async () => {
            if (!showInfo || !photo?._id) return;
            setLoading(true);
            setError(null);
            try {
                const metadata = await photoService.getPhotoMetadata(photo._id);
                setTitle(metadata.title || "");
                setDescription(metadata.description || "");
                setTags(metadata.tags || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch photo metadata.");
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, [showInfo, photo?._id]);


    if (!photo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex z-50 transition-all duration-300">
            {/* Main Image Panel */}
            <div
                className={`relative flex-1 flex items-center justify-center transition-all duration-300 ${showInfo ? "w-3/4" : "w-full"}`}
            >
                {/* Back Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-white text-2xl hover:text-gray-300"
                    title="Back"
                >
                    <FaArrowLeftLong className="cursor-pointer" />
                </button>

                {/* Image */}
                <div ref={imageContainerRef}>
                    <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </div>

                {/* Top-Right Controls */}
                <div className="absolute top-4 right-4 flex gap-4 text-white text-2xl">
                    <LuInfo
                        onClick={() => setShowInfo(prev => !prev)}
                        className="cursor-pointer rounded-full text-4xl transition p-2 hover:bg-white/20 hover:text-blue-400"
                        title="Info"
                    />
                    {!isRestore ? (
                        <>
                            {photo.isFavorite ? (
                                <FaStar
                                    onClick={onFavorite}
                                    className="cursor-pointer rounded-full text-4xl transition p-2 hover:bg-white/20 text-yellow-500"
                                    title="Favorite"
                                />
                            ) : (
                                <FaRegStar
                                    onClick={onFavorite}
                                    className="cursor-pointer rounded-full text-4xl transition p-2 hover:bg-white/20"
                                    title="Favorite"
                                />
                            )}
                            <FaRegTrashAlt
                                onClick={onTrash}
                                className="cursor-pointer rounded-full text-4xl transition p-2 hover:bg-white/20 hover:text-red-400"
                                title="Trash"
                            />
                        </>
                    ) : (
                        <FaTrashRestoreAlt
                            onClick={onRestore}
                            className="cursor-pointer rounded-full text-4xl transition p-2 hover:bg-white/20 text-green-400"
                            title="Restore"
                        />
                    )}
                </div>
            </div>

            {/* Info Panel */}
            {showInfo && (
                <div className="w-1/4 bg-white text-black p-6 shadow-lg overflow-y-auto transition-all duration-300 relative">
                    {/* Close Icon */}
                    <button
                        onClick={() => setShowInfo(false)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        title="Close Info"
                    >
                        <IoCloseSharp size={24} />
                    </button>

                    <h2 className="text-2xl mb-4">Photo Info</h2>

                    {/* Title input */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-4 border-b border-gray-400 focus:border-blue-500 focus:outline-none px-1 py-1 placeholder-gray-500"
                        placeholder="Title"
                    />

                    {/* Description textarea */}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-4 border-b border-gray-400 focus:border-blue-500 focus:outline-none px-1 py-1 resize-none placeholder-gray-500"
                        rows={3}
                        placeholder="Description"
                    />

                    {/* Tags input */}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add a tag and press Enter"
                        className="w-full mb-2 border-b border-gray-400 focus:border-blue-500 focus:outline-none px-1 py-1 placeholder-gray-500"
                    />

                    {/* Tags display */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-default select-none"
                            >
                                <span>{tag}</span>
                                <button
                                    onClick={() => removeTag(index)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                    title="Remove tag"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSaveMetadata}
                        disabled={loading}
                        className="bg-[#0b57d0] hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded cursor-pointer float-end mt-5 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-600 mt-2">{error}</p>}

                    {/* Metadata */}
                    <div className="pt-4 text-sm text-gray-600 mt-16">
                        <h3 className="text-sm text-gray-500 font-semibold tracking-wide mb-4">Details</h3>
                        <p><strong>Uploaded At:</strong> {new Date(photo.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            )}

        </div>
    );
}
