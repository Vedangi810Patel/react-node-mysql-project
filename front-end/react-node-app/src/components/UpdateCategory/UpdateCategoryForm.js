import React, { useState, useEffect } from 'react';
import './UpdateCategoryForm.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function UpdateCategoryForm({ category, onUpdate, onCancel }) {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/LogIn");
          toast.error("Invalid Token!");
        }
      }, [token, navigate]);

    const [formData, setFormData] = useState({
        category_id: category.category_id,
        category: category.category,
        createdBy: category.created_by,
    });

    const handleChange = (e) => {
        console.log(formData)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="update-form">
            <h3> Update Category Details </h3>
            <form onSubmit={handleSubmit}>
                <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category Id" disabled={true} />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="category" />
                <input type="number" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="createdBy" disabled={true} />
                <div className="form-buttons">
                    <button className="submit" type="submit">Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCategoryForm;
