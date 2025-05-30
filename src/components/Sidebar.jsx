import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <nav className="min-h-screen p-2 w-full">
            <h2 className="text-2xl font-semibold mb-9 p-2 uppercase">G - Photos</h2>
            <ul className="space-y-4">
                {navItems.map(({ name, path, icon }) => (
                    <li key={name}>
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                `px-3 py-3 rounded-full transition-colors pl-5 text-[#444746] flex items-end  ${
                                    isActive ? 'bg-[#C2E7FF] font-medium text-[#001D35]' : 'hover:bg-[#d9d9d980] '
                                }`
                            }
                        >
                            <span className='ml-2 mr-3 text-xl '>
                                {icon}
                            </span>
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
