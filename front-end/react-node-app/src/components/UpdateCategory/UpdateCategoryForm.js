import React, { useState } from 'react';
import './UpdateCategoryForm.css';

function UpdateCategoryForm({ category, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        category_id: category.category_id,
        catgoryName : category.category,
        createdBy: category.created_by,
    });

    const handleChange = (e) => {
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
                <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category Id" disabled='true' />
                <input type="text" name="category" value={formData.catgoryName} onChange={handleChange} placeholder="catgory" />
                <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="createdBy" disabled='true'/>
                {/* <input type="number" name="publish_year" value={formData.publish_year} onChange={handleChange} placeholder="Publish Year" />
                <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} placeholder="Quantity Available" /> */}
                <div className="form-buttons">
                    <button className="submit" type="submit">Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCategoryForm;
