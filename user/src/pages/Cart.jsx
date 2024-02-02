import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token,
                 },
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data.products);
                calculateTotalAmount(data.products);
            } else {
                throw new Error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotalAmount = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalAmount(total);
    };

    const removeFromCart = async (product) => {
        try {
            const token = localStorage.getItem('accessToken')
            // Ваш запрос на сервер для удаления продукта из корзины
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ id: product.id })
            });

            if (response.ok) {
                setCartItems(cartItems.filter(item => item.id !== product.id));
                setTotalAmount(totalAmount - product.price);
            } else {
                throw new Error('Failed to remove product from cart');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div>Total Amount: {totalAmount}</div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;