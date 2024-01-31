import React, { useState } from 'react';

function NavigationComponent({ currentPage, setCurrentPage }) {
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [hoveredButton, setHoveredButton] = useState(null);

    const handleButtonHover = (button) => {
        setHoveredButton(button);
    };

    const handleButtonLeave = () => {
        setHoveredButton(null);
    };

    const buttons = [
        { label: 'New Auction', value: 'newAuction' },
        { label: 'Edit Profile', value: 'editProfile' },
        { label: 'View Lots', value: 'viewLots' },
    ];

    return (
        <div className="navigation-container">
            {buttons.map((button) => (
                <button
                    key={button.value}
                    type="button"
                    className={
                        currentPage === button.value
                            ? 'navigation-button active'
                            : hoveredButton === button.value
                                ? 'navigation-button hover'
                                : 'navigation-button'
                    }
                    onClick={() => handlePageChange(button.value)}
                    onMouseEnter={() => handleButtonHover(button.value)}
                    onMouseLeave={handleButtonLeave}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}

export default NavigationComponent;
