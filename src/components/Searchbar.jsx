import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Searchbar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <div className="w-full p-4">
            <div
                className={`relative flex items-center transition-all duration-300 rounded-full 
                    ${isFocused || query ? 'bg-white shadow-md' : 'bg-[#E9EEF6]'}`}
            >
                <FaSearch className={`absolute left-4 text-gray-500 transition-all duration-200 ${isFocused ? 'text-black' : ''}`} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Photos"
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full pl-10 pr-10 py-3 bg-transparent rounded-full outline-none text-sm"
                />
                {query && (
                    <IoClose
                        onClick={handleClear}
                        className="absolute right-4 text-gray-500 cursor-pointer hover:text-black transition-all duration-200 text-lg"
                        title="Clear"
                    />
                )}
            </div>
        </div>
    );
};

export default Searchbar;
