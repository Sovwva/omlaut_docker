// ProductInfoModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrlLot, BaseUrlUser } from '../../config';

function ProductInfoModal({ product, closeModal, isOwned }) {
    const [imageData, setImageData] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(BaseUrlLot + `/api/image/download/${product.id}`, {
                    responseType: 'arraybuffer',
                });
                const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                setImageData(`data:image/png;base64,${base64Image}`);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        if (product && product.id) {
            fetchImage();
        }
    }, [product]);

    const handleBidChange = (event) => {
        setBidAmount(event.target.value);
    };

    const placeBid = async () => {
        try {
            const response = await axios.post(BaseUrlUser + `/api/user`, {
                auctionId: product.id,
                bet: parseFloat(bidAmount),
            });
            console.log(response.data); // Обработайте успешный ответ от сервера по необходимости
            closeModal();
        } catch (error) {
            console.error('Error placing bid:', error.response.data);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2>{product.name}</h2>
                    <p>End Date: {product.end_time}</p>
                    <p>Current Price: {product.current_price}</p>
                    {imageData && <img src={imageData} alt={product.name} />}
                    {!isOwned && (
                        <div>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={handleBidChange}
                                placeholder="Enter your bid amount"
                            />
                            <button onClick={placeBid}>Place Bid</button>
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                    )}
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ProductInfoModal;
