import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import photoService from "../services/photoService";

export default function UploadModal({ image, file, onClose, onConfirm }) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        file: ""
    })


    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            file: file
        }))
    }, [file, image])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select a file first');
            return;
        }
        try {
            const uploadedPhoto = await photoService.uploadPhoto(form);
            if (uploadedPhoto) {
                console.log("success");
                onConfirm()
            }
        } catch (err) {
            console.error(err.message || 'Upload failed');
        }
    };


    return (
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px] border border-[#d9d9d9] shadow-2xl">
                <h2 className="text-lg font-semibold mb-4 uppercase flex items-center justify-center">
                    <span>
                        <FaUpload />
                    </span>
                    <span className="ml-4">
                        Image Upload
                    </span>
                </h2>
                <hr className="text-[#d9d9d9]" />
                <div className="w-full flex justify-start mt-4">
                    <label for="title" className="w-[30%]">Title * </label>
                    <input id="title" name="title" type="text" placeholder="Enter title" className="p-2 border border-grey rounded-md mb-4 w-[60%]" onChange={handleChange} />
                </div>
                <div className="w-full flex justify-start">
                    <label for="description" className="w-[30%]">Description * </label>
                    <input id="description" name="description" type="text-area" placeholder="Enter description" className="p-2 border border-grey rounded-md mb-4 w-[60%]" onChange={handleChange} />
                </div>
                {image && <img src={image} alt="Preview" className="w-[50%] h-[50%] mb-4" />}
                <div className="flex justify-end mt-12">
                    <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Confirm</button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded ml-4">Cancel</button>
                </div>
            </div>
        </div>
    );
}
