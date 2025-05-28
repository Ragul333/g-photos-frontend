import React from 'react';
import { Link } from 'react-router-dom';
import { MdInsertPhoto } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


const Sidebar = () => {
    const navItems = [
        { name: 'Photos', path: '/', icon: <MdInsertPhoto /> },
        { name: 'Albums', path: '/albums', icon: <MdOutlinePhotoAlbum /> },
        { name: 'Favorites', path: '/favorites', icon: <FaRegStar /> },
        { name: 'Trash', path: '/trash', icon: <FaTrashCan /> },
    ];

    return (
        <nav className="min-h-screen p-6 w-64">
            <h2 className="text-2xl font-semibold mb-6 p-2 uppercase">G - Photos</h2>
            <ul className="space-y-4">
                {navItems.map(({ name, path, icon }) => (
                    <li key={name}>
                        <Link
                            to={path}
                            className="block hover:bg-[#d9d9d9] px-3 py-2 rounded-full transition-colors pl-5 text-[#444746] flex items-end"
                        >
                            <span className='mr-2 text-xl'>
                                {icon}
                            </span>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
