const { QueryTypes } = require('sequelize');
const sequelize = require("../configs/dbConfig");

const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        // console.log(req.users.user_id);
        const createdBy = req.user.user_id;
        console.log(createdBy);

         // Check if all required fields are present
        if (!category) {
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
            VALUES ('${category}', ${createdBy})`,
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
        console.log("Fetch");
        const createdBy = req.user.user_id;
        const userRole = req.user.user_role;
        let categoryData;

        if(userRole === 1) {
            categoryData = await sequelize.query(
                `SELECT * FROM categories`, 
                { type: QueryTypes.SELECT }
            );
        } else {
            categoryData = await sequelize.query(
                `SELECT * from categories where created_by = ${createdBy}`,
                {type: QueryTypes.SELECT}
            );
        }

        // const category = await sequelize.query(
        //     `SELECT * from categories`, { type: QueryTypes.SELECT }
        // );

        if(!categoryData.length) {
            return res.status(404).json({
                message: "No Category Found"
            });
        }

        res.status(200).json(categoryData);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const getCategoryByName = async (req, res) => {
    const { category } = req.body;
    try {
    //     const result = await sequelize.query(
    //         `SELECT * FROM categories WHERE category = '${category}'`, { type: QueryTypes.SELECT }
    //     );
    //     res.status(200).json(result);
    // } catch (error) {
    //     console.log("Error Detected", error);
    // }
        const createdBy = req.user.user_id;
        const userRole = req.user.user_role;
        let categoryData;

        if(userRole === 1) {
            categoryData = await sequelize.query(
                `SELECT * FROM categories where category = '${category}'`, 
                { type: QueryTypes.SELECT }
            );
        } else {
            categoryData = await sequelize.query(
                `SELECT * from categories where created_by = ${createdBy} and category = '${category}'`,
                {type: QueryTypes.SELECT}
            );
        }
        if(categoryData.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(categoryData);
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateCategory = async (req, res) => {
    const { category_id, categoryName } = req.body;
    const createdBy = req.user.user_id;
    const userRole = req.user.user_role;

    if (!category_id || !categoryName ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {

        const category = await sequelize.query(
            `SELECT * FROM categories WHERE category_id = ${category_id}`,
            { type: QueryTypes.SELECT }
        );

        if (category.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (userRole !== 1 && category[0].created_By !== createdBy) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        await sequelize.query(
            `UPDATE categories SET 
            category = '${categoryName}'
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
    const { category_id } = req.body;
    const createdBy = req.user.user_id;
    const userRole = req.user.user_role;
    // const { book_id } = req.body;

    try {
        const category = await sequelize.query(
            `SELECT * FROM categories WHERE category_id = ${category_id}`,
            { type: QueryTypes.SELECT }
        );


        if (category.length === 0) {
            return res.status(404).json({
                error: "Category not found"
            });
        }

        if (userRole !== 1 && category[0].created_By !== createdBy) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        await sequelize.query(
            `DELETE FROM categories WHERE category_id = ${category_id}`,
            { type: QueryTypes.DELETE }
        );

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting Category:", error);
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