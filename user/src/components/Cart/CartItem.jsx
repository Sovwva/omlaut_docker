import React from 'react';

const CartItem = ({ product, onRemove }) => {
    const handleRemove = () => {
        onRemove(product);
    };

    return (
        <div className="cart-item">
            <div>{product.name}</div>
            <div>{product.price}</div>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;