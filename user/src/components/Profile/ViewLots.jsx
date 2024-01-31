import React, { useState, useEffect } from 'react';
import ProductTypeButtons from '../products/ProductTypeButtons';
import Products from '../products/Products';

function ViewLots({ currentPage }) {
    // eslint-disable-next-line
    const [showProductTypes, setShowProductTypes] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);

    useEffect(() => {
        if (currentPage === 'viewLots') {
            setShowProductTypes(true);
        } else {
            setShowProductTypes(false);
            setSelectedProductType(null);
        }
    }, [currentPage]);

    const handleProductTypeSelect = (type) => {
        setSelectedProductType(type);
    };

    const productTypes = ['User Lots', 'Participated Lots', 'Paid Lots'];
    const showButtons = currentPage === 'viewLots';

    return (
        <div className="view-lots-container">
            <h2>View Lots</h2>

            <ProductTypeButtons
                showButtons={showButtons}
                productTypes={productTypes}
                selectedProductType={selectedProductType}
                onSelectProductType={handleProductTypeSelect}
            />

            {selectedProductType && <Products productType={selectedProductType} />}
        </div>
    );
}

export default ViewLots;
