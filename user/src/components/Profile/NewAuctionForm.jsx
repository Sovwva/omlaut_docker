import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BaseUrlLot } from '../../config';

function NewAuctionForm() {
    const { register, handleSubmit, setValue, reset } = useForm();

    const handleNewAuctionSubmit = async (data) => {
        try {
            // Отправка запроса на создание нового аукционного лота
            const auctionData = {
                name: data.name,
                description: data.description,
                startingPrice: data.startingPrice,
                lifeTime: data.lifeTime,
            };

            const createAuctionResponse = await axios.post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/product/create`,
                auctionData
            );

            console.log('Auction created:', createAuctionResponse.data);

            // Отправка фотографии
            const auctionId = createAuctionResponse.data;
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const uploadImageResponse = await axios.post(
                BaseUrlLot + `/api/image/upload/${auctionId}`,
                formData
            );

            console.log('Image uploaded:', uploadImageResponse.data);

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
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
                    Starting Price:
                    <input type="number" {...register('startingPrice', { required: true })} />
                </label>
                <label>
                    Quantity:
                    <input type="number" {...register('quantity', { required: true })} />
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
