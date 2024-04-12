import React, { useState } from 'react';
import './UpdateProductForm.css';

function UpdateProductForm({ product, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        // category_id: category.category_id,
        // catgoryName: category.category,
        // createdBy: category.created_by,
        product_id : product.product_id,
        product_name : product.product_name,
        product_description : product.product_description,
        price : product.price,
        product_images : product.product_images,
        category_id : product.catgory_id,
        created_by : product.created_by
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
                <input type="number" name="product_id" value={formData.product_id} onChange={handleChange} placeholder="Product Id" disabled={true} />
                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} placeholder="catgory" />
                <input type="text" name="product_description" value={formData.product_description} onChange={handleChange} placeholder="product_desciption" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="price" />
                <input type="file" name="product_images" accept='image/*' onChange={handleChange} placeholder="product_images" />
                <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="category_id" disabled={true} />
                <input type="number" name="created_by" value={formData.created_by} onChange={handleChange} placeholder="created_by" disabled={true} />

                <div className="form-buttons">
                    <button className="submit" type="submit">Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProductForm;
