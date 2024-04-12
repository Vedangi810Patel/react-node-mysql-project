import React, { useState, useEffect } from "react";
import "./Product.css";
// import UpdateForm from '../UpdateForm/UpdateForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdateProductForm from '../UpdateProduct/UpdateProductForm';
// import {toast} from "react-toastify";

function ProductCrud() {
    const [categories, setCategories] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriessPerPage] = useState(5); // Change this value as needed
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/LogIn");
            toast.error("Invalid Token!");
        }
    }, [token, navigate]);

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/AllProduct");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.onload = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                    setCategories(data);
                } else {
                    console.error("Error fetching posts:", xhr.statusText);
                }
            }
            // }  xhr.send();
        };
        xhr.send();
    }, [showPopup]);


    const handleUpdate = (category) => {
        setSelectedCategory(category);
        setShowPopup(true);
    };

    const handleUpdateSubmit = (updatedData) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:5000/UpdateProduct');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log("Update response:", data);
                    xhr.send(JSON.stringify(updatedData));
                    setShowPopup(false);
                    toast.success('Category Data Updated Successfully !');
                } else {
                    console.error('Error updating category:', xhr.statusText);
                    toast.error('Unable to Update the Data !');
                }
            }
        };
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleDelete = async (product) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("DELETE", "http://localhost:5000/DeleteProduct");
                xhr.setRequestHeader("Authentication", `Bearer ${token}`);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            // console.log('Book deleted successfully.');
                            toast.success("Category deleted successfully!");
                            setCategories((prevCategories) =>
                                prevCategories.filter((p) => p.product_id !== product.product_id)
                            );
                        } else {
                            console.error("Failed to delete category:", xhr.statusText);
                            toast.error("An error occurred while deleting the book.");
                        }
                    }
                };
                xhr.send(JSON.stringify({ product_id : product.product_id }));
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const indexOfLastCategory = currentPage * categoriessPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriessPerPage;
    const currentCategoriess = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const totalPages = Math.ceil(categories.length / categoriessPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
    };

    const handlePageChange = (event) => {
        const pageNumber = parseInt(event.target.value);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container">
            <div className="nav">
                <ul>
                    <li>
                        <Link to={"/AddProduct"}>
                            <button className="link"> Insert Product </button>
                        </Link> {" "}
                        <Link to={"/AllCategory"}>
                            <button className="link"> All Category </button>
                        </Link> {" "}
                        <Link to={"/AddCategory"}>
                            <button className="link"> Add Category </button>
                        </Link>
                    </li>
                    <br />
                </ul>
            </div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Images</th>
                        <th>Category</th>
                        <th>Created By</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategoriess.map((product, index) => (
                        <tr key={index}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_description}</td>
                            <td>{product.price}</td>
                            <td>{product.product_images}</td>
                            <td>{product.category_id}</td>
                            <td>{product.created_by}</td>
                            <td>
                                <button className="update" onClick={() => handleUpdate(product)}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(product)} >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <input
                    type="number"
                    value={currentPage}
                    min={1}
                    max={totalPages}
                    onChange={handlePageChange}
                />
                <span> of {totalPages}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <UpdateProductForm category={selectedCategory} onUpdate={handleUpdateSubmit} onCancel={handleCancel} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCrud;
