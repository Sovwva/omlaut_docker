// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductInfoModal from './ProductInfoModal';
// import ProductEditModal from './ProductEditModal';
// import { BaseUrlLot } from '../../config';
// import error from "../../pages/error";

// const endpointMapping = {
//     'All Lots': '/api/auction',
//     'User Lots': '/api/auction/auth-user-auctions',
//     'Participated Lots': '/api/auction/auth-participant-auctions',
//     'Paid Lots': '/api/auction/auth-purchased-auctions',
// };

const Products = ({ productType }) => {
    // const [selectedProduct, setSelectedProduct] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    // const [productsData, setProductsData] = useState([]);
    // const [isEditing, setIsEditing] = useState(false);
    // const [isOwned, setIsOwned] = useState(false);
    // const token = localStorage.getItem('accessToken')
    //
    // const fetchData = async () => {
    //     try {
    //         console.log('Fetching data from server...');
    //         const response = await axios.get(BaseUrlLot + endpointMapping[productType], {
    //                 headers: {
    //                     Authorization: 'Bearer' + `${token}`
    //                 }
    //             }
    //         ).then(response => {
    //             if (response.status >=200 && response.status < 300) {
    //                 setProductsData(response.data);
    //                 productsData.forEach((item) => {
    //                     const itemId = item.id
    //                     const requestUrl = BaseUrlLot + endpointMapping[productType] + `/${itemId}`;
    //                       axios.get(requestUrl, {
    //                           headers: {
    //                               Authorization: 'Bearer' + `${token}`
    //                           }
    //                       }
    //                         itemId
    //                     }
    //                 }
    //                 checkOwnership(productType);
    //                 console.log('Data fetched successfully:', response.data);
    //             }
    //             else {
    //                 console.error(error)
    //             }
    //         })
    //     } catch {
    //         console.error(error)
    //     }
    // }
    //
    // const openModal = (product) => {
    //     setSelectedProduct(product);
    //     setShowModal(true);
    // };
    //
    // const closeModal = () => {
    //     setSelectedProduct(null);
    //     setShowModal(false);
    //     setIsEditing(false);
    // };
    //
    // const checkOwnership = (selectedType) => {
    //     const isOwnedLots = selectedType === 'User Lots';
    //     setIsOwned(isOwnedLots);
    // };
    //
    // const handleEdit = (product) => {
    //     setSelectedProduct(product);
    //     setIsEditing(true);
    // };
    //
    // useEffect(() => {
    //     fetchData();
    // }, [productType]);
    //
    //
    // if (isEditing) {
    //     return (
    //         <ProductEditModal product={selectedProduct} closeModal={closeModal} />
    //     );
    // } else {
    //     return (
    //         <div>
    //             <ul>
    //                 {productsData.map((product) => (
    //                     <li key={product.id} onClick={() => openModal(product)}>
    //                         {product.name}
    //                         {product.}
    //                         {isOwned && (
    //                             <button onClick={() => handleEdit(product)}>Edit</button>
    //                         )}
    //                     </li>
    //                 ))}
    //             </ul>
    //             {showModal && (
    //                 <ProductInfoModal
    //                     product={selectedProduct}
    //                     closeModal={closeModal}
    //                     isOwned={isOwned}
    //                 />
    //             )}
    //         </div>
    //     );
    // }
};

export default Products;
