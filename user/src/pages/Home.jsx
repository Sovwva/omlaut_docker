import Search from "../components/Search";
import {useEffect, useState} from "react";

// import Products from "../components/products/Products";

function Home() {

    const [products, setProducts] = useState([]);

    const handleSearchResult = (searchResults) => {
        console.log("New search results:", searchResults);
        setProducts(searchResults);
        console.log("Products after update:", products);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/`);
                if(!res.ok){
                    throw new Error('Failed to fetch products')
                }
                const data = await res.json();
                setProducts(data);
                console.log("Rendering Home component");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Search onSearchResult={handleSearchResult} />
            <div className="products-container">
                {Array.isArray(products) && products.map(product => (
                    <div key={product.id} className="product">
                        <h2>{product.name}</h2>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;