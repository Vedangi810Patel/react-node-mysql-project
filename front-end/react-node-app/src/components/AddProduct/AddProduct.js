import React, { useState } from 'react';
// import './BookCreate.css'; // Adjust the CSS file path if needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AddProduct = ({ }) => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        price: '',
        product_images: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/AddProduct', true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authentication', `Bearer ${token}`)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    toast.success("Product Added Successfully !");
                    setFormData({
                        category_name: ''
                    });
                } else {
                    console.error('Error adding Product:', xhr.statusText);
                    alert('Error adding Category');
                }
            }
        };
        xhr.send(JSON.stringify(formData));
    };

    return (
        <div className='form-container'>

            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="product_name"> Category : </label>
                <input type="text" name="product_name" id="product_name" value={formData.product_name} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="product_description"> Category : </label>
                <input type="text" name="product_description" id="product_description" value={formData.product_description} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="price"> Category : </label>
                <input type="number" name="price" id="price" value={formData.price} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="product_images"> Category : </label>
                <input type="file" name="product_images" id="product_images" value={formData.product_images} placeholder="Grocery" onChange={handleChange} />

                <button className="submit" type="submit">Add Category</button>
                {/* <button type="button" onClick={onCancel}>Cancel</button> Cancel button */}
            </form>
            <div>
                <ul>
                    <li> <Link to={'/AllProduct'}> <button className="link"> CRUD PAGE </button> </Link> </li> <br />
                    {/* <li> <Link to={'/'}> <button className='link'> Home Page </button> </Link> </li> */}
                </ul>
            </div>
        </div>
    );
}

export default AddProduct;