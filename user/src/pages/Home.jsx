import Search from "../components/Search";
import {useEffect, useState} from "react";

// import Products from "../components/products/Products";

function Home() {

    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('192.168.1.100:443/user');
                console.log(res.status)
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Search/>
            <p>{response}</p>
            {console.log(response)}
            {/*<Products selectedProductType="All Lots" currentUser={currentUser} />*/}
        </>
    );
}

export default Home;