import React from 'react';

const ProductTypeButtons = ({
                                showButtons,
                                productTypes,
                                selectedProductType,
                                onSelectProductType,
                            }) => {
    const handleButtonClick = (type) => {
        onSelectProductType(type);
    };

    return (
        <div className="product-type-buttons">
            {showButtons &&
                productTypes.map((type) => (
                    <button
                        key={type}
                        className={
                            selectedProductType === type ? 'product-type-button active' : 'product-type-button'
                        }
                        onClick={() => handleButtonClick(type)}
                    >
                        {type}
                    </button>
                ))}
        </div>
    );
};

export default ProductTypeButtons;
