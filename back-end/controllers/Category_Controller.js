const { QueryTypes } = require('sequelize');
const sequelize = require("../configs/dbConfig");

const createCategory = async (req, res) => {
    try {
        const { category, created_by } = req.body;

        // Check if all required fields are present
        if (!category || !created_by) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if email is already registered
        const existingCategory = await sequelize.query(
            `SELECT category FROM categories WHERE category = '${category}'`,
            { type: QueryTypes.SELECT }
        );

        if (existingCategory.length > 0) {
            return res.status(400).json({ error: "Category already exists" });
        }

        await sequelize.query(
            `INSERT INTO categories (category, created_by) 
            VALUES ('${category}', ${created_by})`,
            { type: QueryTypes.INSERT }
        );
        res.status(200).json({ message: "Category Added successfully" });
    } catch (error) {
        console.error("Error adding Category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fetchAllCategory = async (req, res) => {
    try {
        console.log("Fetch")
        const category = await sequelize.query(
            `SELECT * from categories`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(category);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const getCategoryByName = async (req, res) => {
    const { category } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT * FROM categories WHERE category = '${category}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json(result);
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateCategory = async (req, res) => {
    const {
        category_id,
        category,
        created_by
    } = req.body;

    if (!category_id || !category || !created_by) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sequelize.query(
            `UPDATE categories SET 
            category_id = ${category_id},
            category = '${category}',
            created_by = ${created_by},
            WHERE category_id = ${category_id}`,
            { type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: "Category updated successfully" });
        // res.status(200).json(res.send("Book Updated Sucessfully !"));
    } catch (error) {
        console.error("Error Uupdating Category:", error);
    }
};

const deleteCategory = async (req, res) => {
    const { book_id } = req.body;

    try {
        const result = await sequelize.query(
            `DELETE FROM books WHERE book_id = ${book_id}`, { type: QueryTypes.UPDATE }
        );

        if (result[1] === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting Book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createCategory,
    fetchAllCategory,
    getCategoryByName,
    updateCategory,
    deleteCategory
}