import React, { useState, useEffect } from 'react';
// import './BookCreate.css'; // Adjust the CSS file path if needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategory = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
            toast.error("Invalid Token!");
        }
    }, [token, navigate]);

    const [formData, setFormData] = useState({
        category_name: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/AddCategory', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(JSON.stringify({ category: formData.category_name }));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    toast.success("Category Added Successfully !");
                    setFormData({
                        category_name: ''
                    });
                } else {
                    console.error('Error adding Category:', xhr.statusText);
                    alert('Error adding Category');
                }
            }
        };

    };

    return (
        <div className='form-container'>

            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="category_name"> Category : </label>
                <input type="tect" name="category_name" id="category_name" value={formData.category_name} placeholder="Grocery" onChange={handleChange} />

                <button className="submit" type="submit">Add Category</button>
                {/* <button type="button" onClick={onCancel}>Cancel</button> Cancel button */}
            </form>
        </div>
    );
}

export default AddCategory;