import React, { useState, useEffect } from 'react';
// import './BookCreate.css'; // Adjust the CSS file path if needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/");
          toast.error("Invalid Token!");
        }
      }, [token, navigate]);

    console.log(token)
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        price: 0,
        product_images: null,
        category_name: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fileHandle = (e) => {
        e.preventDefault();
        const product_img = e.target.files[0]
        console.log(product_img)
        setFormData({
            ...formData, product_images: product_img
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        const formDatas = new FormData();
        formDatas.append("product_name", formData.product_name);
        formDatas.append("product_description", formData.product_description);
        formDatas.append("price", formData.price);
        formDatas.append("product_images", formData.product_images);
        formDatas.append("category_name", formData.category_name);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/AddProduct', true);
        // xhr.setRequestHeader('Content-Type', 'multipart/formdata');
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(formDatas);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    toast.success("Product Added Successfully !");
                    window.location.replace('/AllProduct');
                    setFormData({
                        product_name: '',
                        product_description: '',
                        price: 0,
                        product_images: null,
                        category_name: ''
                    });
                } else {
                    console.error('Error adding Product:', xhr.statusText);
                    alert('Error adding Category');
                }
            }
        };

    };

    return (
        <div className='form-container'>

            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="product_name"> Product Name : </label>
                <input type="text" name="product_name" id="product_name" value={formData.product_name} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="product_description"> Product Description : </label>
                <input type="text" name="product_description" id="product_description" value={formData.product_description} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="price"> Price : </label>
                <input type="number" name="price" id="price" value={formData.price} placeholder="Grocery" onChange={handleChange} />

                <label htmlFor="product_images"> Product Images : </label>
                <input type="file" name="product_images" id="product_images" accept='image/*' placeholder="Grocery" onChange={fileHandle} />

                {/* <label htmlFor="product_images"> Product Images : </label>
                <input type="file" name="product_images" id="product_images" accept='image/*' placeholder="Grocery" onChange={fileHandle} /> */}

                <label htmlFor="category_name"> Category : </label>
                <input type="text" name="category_name" id="category_name" value={formData.category_name} placeholder="Grocery" onChange={handleChange} />

                <button className="submit" type="submit">Add Category</button>
                {/* <button type="button" onClick={onCancel}>Cancel</button> Cancel button */}
            </form>
        </div>
    );
}

export default AddProduct;