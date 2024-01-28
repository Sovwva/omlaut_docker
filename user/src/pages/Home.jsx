import Search from "../components/Search";
import {useEffect, useState} from "react";

// import Products from "../components/products/Products";

function Home() {

    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/user`);
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