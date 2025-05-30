import { useEffect, useRef, useState } from "react";
import photoService from "../services/photoService";
import { IoIosClose } from "react-icons/io";

export default function UploadModal({ images, onClose, onConfirm }) {
    const modalRef = useRef(null);

    const [formData, setFormData] = useState([]);
    const [localImages, setLocalImages] = useState([]);

    useEffect(() => {
        if (!images) return;

        if (!Array.isArray(images)) {
            console.warn("UploadModal received 'images' prop not as array:", images);
            images = [images];
        }

        setFormData(images.map(({ file }) => ({
            title: "",
            description: "",
            file,
        })));
        setLocalImages(images);
    }, [images]);


    const handleUpload = async () => {
        try {
            await photoService.uploadPhoto(formData);
            onConfirm();
        } catch (err) {
            console.error(err.message || "Upload failed");
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...localImages];
        const newFormData = [...formData];

        newImages.splice(index, 1);
        newFormData.splice(index, 1);

        setLocalImages(newImages);
        setFormData(newFormData);

        if (newImages.length === 0) {
            onClose();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto border border-[#d9d9d9] shadow-2xl" ref={modalRef}>
                <div className="grid grid-cols-3 gap-4">
                    {localImages.map((img, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={img.image}
                                alt={`preview-${index}`}
                                className="w-32 h-32 object-cover rounded-md"
                            />
                            {/* Remove Icon */}
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                title="Remove"
                            >
                                <IoIosClose size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleUpload}
                        className="px-4 py-2 bg-[#0b57d0] text-white rounded-full cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
