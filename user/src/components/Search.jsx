import React, { useState } from 'react';
import search_icon from '../assets/img/search.png';

const Search = ({ onSearchResult }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    };

    const handlePriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const queryParams = new URLSearchParams({
                name: name,
                category: category,
                price_from: priceFrom,
                price_to: priceTo,
            });

            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Server is not responding');
            }

            const data = await response.json();
            console.log(data);
            if(typeof onSearchResult === 'function'){
                onSearchResult(data);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="search-input"
                placeholder="Name"
            />
            <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                className="search-input"
                placeholder="Category"
            />
            <input
                type="text"
                value={priceFrom}
                onChange={handlePriceFromChange}
                className="search-input"
                placeholder="Price from"
            />
            <input
                type="text"
                value={priceTo}
                onChange={handlePriceToChange}
                className="search-input"
                placeholder="Price to"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={search_icon} className={'search-button'} alt="Search" />
            </button>
        </div>
    );
};

export default Search;
