import { FaHeart, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaTrashRestore } from "react-icons/fa";

export default function PhotoPreviewModal({ photo, onClose, onFavorite, onTrash, onRestore, isRestore }) {
    if (!photo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[500px] text-center relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-2xl font-bold"
                >
                    <IoClose />
                </button>
                <img src={photo.imageUrl} alt={photo.title} className="rounded-lg mb-4 max-h-[300px] mx-auto" />
                <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{photo.description}</p>

                <div className="flex justify-center gap-8 text-xl">
                    {
                        !isRestore ?
                            <>
                                <FaHeart
                                    onClick={onFavorite}
                                    className={`cursor-pointer ${photo.isFavorite ? "text-red-500" : ""}`}
                                    title="Toggle Favorite"
                                />
                                <FaTrash
                                    onClick={onTrash}
                                    className="cursor-pointer text-gray-600 hover:text-red-500"
                                    title="Move to Trash"
                                />
                            </>
                            :
                            <FaTrashRestore
                                onClick={onRestore}
                                className="cursor-pointer text-gray-600 hover:text-green-500"
                                title="Restore"
                            />


                    }
                </div>
            </div>
        </div>
    );
}
