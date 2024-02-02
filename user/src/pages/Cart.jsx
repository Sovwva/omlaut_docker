import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const getToken = () => {
        return localStorage.getItem('accessToken');
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                headers: { Authorization: token },
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

    const addToCart = async (product) => {
        try {
            const token = getToken();
            console.log(product.id)
            // Ваш запрос на сервер для добавления продукта в корзину
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                method: 'POST',
                headers: { Authorization: `${token}` },
                body: {id: product.id},
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems([...cartItems, data.product]);
                setTotalAmount(totalAmount + data.product.price);
            } else {
                throw new Error('Failed to add product to cart');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (product) => {
        try {
            // Ваш запрос на сервер для удаления продукта из корзины
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                method: 'DELETE',
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