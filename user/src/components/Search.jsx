import React, { useState } from 'react';
import search_icon from '../assets/img/search.png';
import { BaseUrlLot } from '../config';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const response = await fetch(`${BaseUrlLot}/api/auction?search=${searchTerm}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Server is not responding');
            }

            const data = await response.json();
            // Добавьте свою логику обработки результатов поиска здесь
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={search_icon} className={'search-button'} alt="Search" />
            </button>
        </div>
    );
};

export default Search;
