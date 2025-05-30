import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import { FaPlus } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoApps } from "react-icons/io5";
import UploadModal from "../components/UploadModal";
import { usePhotoUpdate } from '../context/PhotoUpdateContext';
import { MdInsertPhoto, MdOutlinePhotoAlbum } from "react-icons/md";
import SearchResults from "../components/SearchResults";
import api from "../api/api";

const subOptions = [
    {
        id: 1,
        name: "Album",
        icon: <MdOutlinePhotoAlbum />
    },
    {
        id: 2,
        name: "Photo",
        icon: <MdInsertPhoto />
    }
]

export default function MainLayout() {
    const { triggerUpdate } = usePhotoUpdate();

    const dropdownRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectDropdown, setSelectDropdown] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [searchedPhotos, setSearchedPhotos] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            image: URL.createObjectURL(file)
        }));
        setSelectedImages(previews);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedImages([]);
    }

    const openFileDialog = () => {
        setSelectDropdown(false)
        document.getElementById('hiddenFileInput').click();
    };

    const handleConfirmUpload = async () => {
        triggerUpdate();
        setIsModalOpen(false);
        setSelectedImages([]);
    };

    const handleSearch = async (query) => {
        const q = query.trim();
    
        if (!q) {
            setSearchedPhotos([]);
            return;
        }
    
        try {
            setLoadingSearch(true);
            const res = await api.get('/photos/search', {
                params: {
                    q,       
                    album: q,
                    tag: q 
                }
            });
            setSearchedPhotos(res.data.data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoadingSearch(false);
        }
    };
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSelectDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex bg-[#f0f4f9] h-screen overflow-hidden">
            {isModalOpen && (
                <UploadModal
                    images={selectedImages}
                    onClose={handleClose}
                    onConfirm={handleConfirmUpload}
                />
            )}

            <div className="w-[15%]">
                <Sidebar />
            </div>
            <div className="flex-col w-[85%]">
                <header className="flex items-center justify-between">
                    <div className="w-[60%]">
                        <Searchbar onSearch={handleSearch} />
                    </div>
                    <div className="flex w-[20%] justify-around text-xl items-center">
                        <input
                            type="file"
                            accept="image/*"
                            id="hiddenFileInput"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />
                        <div className="relative" ref={dropdownRef}>
                            <FaPlus
                                className="cursor-pointer p-2 text-4xl rounded-full text-[#444746] hover:bg-[#d9d9d980]"
                                onClick={() => setSelectDropdown((prev) => !prev)}
                                title="Create"
                            />

                            {selectDropdown && (
                                <div className="absolute top-14 left-0 bg-white shadow-xl rounded-md w-56 z-50">
                                    <div className="px-4 pt-3 pb-2">
                                        <h3 className="text-sm text-gray-500 font-semibold tracking-wide">Create</h3>
                                    </div>
                                    <ul className="py-2">
                                        {subOptions?.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#444746] text-[1.05rem]"
                                                onClick={() => {
                                                    if (item.name === "Photo") {
                                                        openFileDialog();
                                                    } else {
                                                        setSelectDropdown(false);
                                                        console.log("Create Album clicked");
                                                    }
                                                }}
                                            >
                                                <span className="mr-4 text-lg text-gray-600">{item.icon}</span>
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <FaRegQuestionCircle className="cursor-pointer p-2 text-4xl rounded-full text-[#444746] hover:bg-[#d9d9d9]" title="Help and Feedback" />
                        <IoSettingsOutline className="cursor-pointer p-2 text-4xl rounded-full text-[#444746] hover:bg-[#d9d9d9]" title="Settings" />
                        <IoApps className="cursor-pointer p-2 text-4xl rounded-full text-[#444746] hover:bg-[#d9d9d9]" title="Apps" />
                        <span className="rounded-full p-1 bg-[orange] w-[30px] text-center">
                            R
                        </span>
                    </div>
                </header>
                <main className="m-4 bg-white rounded-xl p-8 absolute h-[83vh] w-[83vw] overflow-y-auto scrollbar-none">
                    {loadingSearch ? (
                        <p className="text-center text-gray-500">Searching...</p>
                    ) : searchedPhotos && searchedPhotos.length > 0 ? (
                        <SearchResults results={searchedPhotos} />
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </div>
    );
}
