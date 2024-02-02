import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function NewAuctionForm() {
    const { register, handleSubmit, setValue, reset } = useForm();

    const getToken = () => {
        return localStorage.getItem('accessToken');
    };

    const handleNewAuctionSubmit = async (data) => {
        try {
            // Отправка запроса на создание нового аукционного лота
            const token = getToken();
            console.log(token)
            const config = {
                headers: { Authorization: `${token}` }
            };
            const auctionData = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: data.category,
            };

            console.log(auctionData)

            const createAuctionResponse = await axios.post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/create`,
                auctionData, config
            );

            console.log('Auction created:', createAuctionResponse.data);

            // Отправка фотографии
            let formData = new FormData();
            formData.append('id', createAuctionResponse.data.id);
            formData.append('image', data.image);

            console.log('FormData:', formData)
            const uploadImageResponse = await axios.post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/upload_photo`,
                formData, config
            );

            console.log('Image uploaded:', uploadImageResponse.data);

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file);
        setValue('image', file); // Устанавливаем значение поля 'image' в объект данных формы
    };

    return (
        <div className="new-auction-form-container">
            <h2>Create a New Auction</h2>
            <form className="new-auction-form" onSubmit={handleSubmit(handleNewAuctionSubmit)}>
                <label>
                    Name:
                    <input type="text" {...register('name', { required: true })} />
                </label>
                <label>
                    Description:
                    <input type="text" {...register('description', { required: true })} />
                </label>
                <label>
                    Price:
                    <input type="number" {...register('price', { required: true })} />
                </label>
                <label>
                    Category:
                    <select {...register('category', { required: true })}>
                        <option value="home appliances">Home appliances</option>
                        <option value="sporting goods">Sporting goods</option>
                        <option value="cooking supplies">Cooking supplies</option>
                    </select>
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewAuctionForm;
