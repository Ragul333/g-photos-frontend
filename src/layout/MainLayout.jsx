import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import { FaPlus } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoApps } from "react-icons/io5";
import UploadModal from "../components/UploadModal";
import { usePhotoUpdate } from '../context/PhotoUpdateContext';


export default function MainLayout() {
    const { triggerUpdate } = usePhotoUpdate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        file: "",
        image: ""
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage((prev) => ({
                ...prev,
                image: URL.createObjectURL(file),
                file: file
            }))
            setIsModalOpen(true);
        }
    };
    
    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedImage({
            file: "",
            image: ""
        });
    }
    
    const openFileDialog = () => {
        document.getElementById('hiddenFileInput').click();
    };
    
    const handleConfirmUpload = async () => {
        triggerUpdate();
        setIsModalOpen(false);
        setSelectedImage({ file: "", image: "" });
    };
    return (
        <div className="flex bg-[#f0f4f9] ">
            {isModalOpen && (
                <UploadModal
                    image={selectedImage?.image}
                    file={selectedImage?.file}
                    onClose={handleClose}
                    onConfirm={handleConfirmUpload}
                />
            )}
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="flex-col w-[75%]">
                <header className="flex items-center justify-between">
                    <div className="w-[75%]">
                        <Searchbar />

                    </div>
                    <div className="flex w-[20%] justify-around text-xl">
                        <input
                            type="file"
                            accept="image/*"
                            id="hiddenFileInput"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <FaPlus className="cursor-pointer" onClick={openFileDialog} title="Upload Photo"/>
                        <FaRegQuestionCircle />
                        <IoSettingsOutline />
                        <IoApps />
                        <span className="rounded-full bg-[orange] w-[30px] text-center">
                            R
                        </span>
                    </div>
                </header>
                <main className="m-4 bg-white rounded-xl p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

