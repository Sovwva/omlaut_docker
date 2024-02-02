import Search from "../components/Search";
import {useEffect, useState} from "react";
import Cart from "./Cart";

// import Products from "../components/products/Products";

function Home() {

    const [products, setProducts] = useState([]);

    const handleSearchResult = (searchResults) => {
        setProducts(searchResults);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/`);
                if(!res.ok){
                    throw new Error('Failed to fetch products')
                }
                const data = await res.json();

                const productsWithPhotos = await Promise.all(data.map(async product => {
                    const photoRes = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/get_photo/?id=${product.id}`);
                    const photoData = await photoRes.json();
                    if (photoData.photo) {
                        const photoUrl = createPhotoUrl(photoData.photo.data);
                        return { ...product, photo: photoUrl }; // Добавляем поле photo к продукту
                    } else {
                        return { ...product, photo: null }; // Добавляем null, если фотография отсутствует
                    }
                }));
    
                setProducts(productsWithPhotos);
                console.log('Products:', productsWithPhotos)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const createPhotoUrl = (photoData) => {
        const blob = new Blob([new Uint8Array(photoData)], { type: 'image/jpeg' });
        console.log('Blob:', blob)
        return URL.createObjectURL(blob);
    };

    const addToCart = async (products) => {
        try {
            const token = localStorage.getItem('accessToken');
            console.log(products.id)
            // Ваш запрос на сервер для добавления продукта в корзину
            const response = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/cart/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ id: products.id }),
            });

            if (response.ok) {
                alert('Product added to cart successfully!');
            } else {
                throw new Error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    return (
        <>
            <Search onSearchResult={handleSearchResult} />
            <div className="products-container">
                {Array.isArray(products) && products.map(product => (
                    <div key={product.id} className="product">
                        <img src={product.photo} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;