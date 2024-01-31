import React, { useState, useEffect } from 'react';
import { BaseUrlLot, BaseUrlPayment } from '../config';
import Products from '../components/products/Products';
import { Navigate } from 'react-router-dom';

const Cart = () => {
    const [productType, setProductType] = useState('won');
    const [hasWonProducts, setHasWonProducts] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const checkWonProducts = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const url = `${BaseUrlLot}/api/auction/auth-winner-auctions`;

                if (!token) {
                    throw new Error('Not authorized');
                }

                const response = await fetch(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setHasWonProducts(data.length > 0);

                    // Calculate total amount
                    let amount = 0;
                    data.forEach((auction) => {
                        amount += auction.current_price;
                    });
                    setTotalAmount(amount);
                } else {
                    setHasWonProducts(false);
                }
            } catch (error) {
                console.error(error);
                setHasWonProducts(false);
            }
        };

        checkWonProducts();
    }, []);
    // eslint-disable-next-line
    const handleProductTypeChange = (type) => {
        setProductType(type);
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const url = `${BaseUrlPayment}/api/payment/create-payment-link`;

            if (!token) {
                throw new Error('Not authorized');
            }

            const response = await fetch(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response.status === 200) {
                const data = await response.text();
                setPaymentLink(data);
                setPaymentInitiated(true);
            } else {
                throw new Error('Failed to create payment link');
            }
        } catch (error) {
            console.error(error);
            setPaymentLink('');
            setPaymentInitiated(false);
        }
    };

    if (paymentInitiated) {
        return <Navigate to="/payment" />;
    }

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <Products productType={productType} />
            {hasWonProducts && (
                <div className="payment-button-container">
                    <div>Total Amount: {totalAmount}</div>
                    <button onClick={handlePayment}>Pay Now</button>
                    {paymentLink && (
                        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                            Complete Payment
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
