import React, { useState, useEffect } from 'react';

function ViewLots({ currentPage }) {
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        if (currentPage === 'viewLots') {
            fetchUserProducts();
        }
    }, [currentPage]);

    const fetchUserProducts = async () => {
        try {
            const token = getToken();
            const res = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/user/get`, {
                headers: { Authorization: `${token}` }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await res.json();
            const userId = userData.id;
            const queryParams = new URLSearchParams({
                user_id: userId,
            });
            const productsRes = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/?${queryParams}`);
            if (!productsRes.ok) {
                throw new Error('Failed to fetch user products');
            }
            const productsData = await productsRes.json();
            setUserProducts(productsData);
        } catch (error) {
            console.error('Error fetching user products:', error);
        }
    };

    const getToken = () => {
        return localStorage.getItem('accessToken');
    };

    return (
        <div className="view-lots-container">
            <h2>View Lots</h2>

            <div className="products-container">
                {Array.isArray(userProducts) && userProducts.map(product => (
                    <div key={product.id} className="product">
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>
                        {/* Добавьте другие детали, если необходимо */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewLots;