import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrlLot } from "../../config";

function ProductEditModal({ product, closeModal }) {
    const [description, setDescription] = useState(product.description);

    const handleEditSubmit = async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Получение токена из локального хранилища
            const response = await axios.put(BaseUrlLot + `/api/auction/${product.id}`, {
                description,
            }, {
                headers: {
                    Authorization: `${token}` // Передача токена в заголовке запроса
                }
            });
            console.log(response.data); // Обработайте успешный ответ от сервера по необходимости
            closeModal();
        } catch (error) {
            console.error('Error editing product:', error);
            // Обработайте ошибку при попытке редактирования лота
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit Product</h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
}
{
}

export default ProductEditModal;
