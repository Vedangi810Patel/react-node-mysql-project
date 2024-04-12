const { QueryTypes } = require('sequelize');
const sequelize = require("../configs/dbConfig");
const ImagesController = require('../middleware/ImageMiddlewareAuthentication');

const createProduct = async (req, res) => {
    try {
        await ImagesController.productImagesAuthentication(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err });
            }

            if (!req.files) {
                return res.status(400).json({ error: "Error: No File Selected!" });
            }

            const { product_name, product_description, category_name, price } =
                req.body;

            // const created_by = req.user.user_id;
            const createdBy = req.user.user_id;

            const product_images = req.files
                ? req.files.map((file) => file.filename)
                : null;

            if (!product_name || !product_description || !category_name || !price) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const [category] = await sequelize.query(
                `SELECT * FROM categories WHERE category = '${category_name}' AND created_by = ${createdBy}`,
                { type: QueryTypes.SELECT }
            );

            console.log(category);

            let category_id = category?.category_id;

            if (!category_id) {
                await sequelize.query(
                    `Insert into categories(category, created_by) Values('${category_name}', ${createdBy})`,
                    { type: QueryTypes.INSERT }
                );

                const [newCategory] = await sequelize.query(
                    `SELECT * FROM categories WHERE category = '${category_name}' AND created_by = ${createdBy}`,
                    { type: QueryTypes.SELECT }
                );

                category_id = newCategory?.category_id;

                // .catch((err) => {console.error("Error adding user:", err);})
            }

            try {
                await sequelize.query(
                    `Insert into products (product_name, product_description, price, product_images, category_id, created_by) 
                  Values ('${product_name}','${product_description}',${price}, :product_images, ${category_id}, ${createdBy})`,

                    {
                        replacements: {
                            product_images: JSON.stringify(product_images),
                            type: QueryTypes.INSERT,
                        },
                    }
                );

                res.status(200).json({ message: "Product added successfully" });
            } catch (error) {
                console.error("Error adding Product:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        );
    } catch (error) {
        console.error("Error adding Product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fetchAllProduct = async (req, res) => {
    try {
        console.log("Fetch");
        const createdBy = req.user.user_id;
        const userRole = req.user.user_role;
        let categoryData;

        if (userRole === 1) {
            categoryData = await sequelize.query(
                `SELECT * FROM products`,
                { type: QueryTypes.SELECT }
            );
        } else {
            categoryData = await sequelize.query(
                `SELECT * from products where created_by = ${createdBy}`,
                { type: QueryTypes.SELECT }
            );
        }

        // const category = await sequelize.query(
        //     `SELECT * from categories`, { type: QueryTypes.SELECT }
        // );

        if (!categoryData.length) {
            return res.status(404).json({
                message: "No Product Found"
            });
        }

        res.status(200).json(categoryData);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const getProductByName = async (req, res) => {
    const { product_name } = req.body;
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

        if (userRole === 1) {
            categoryData = await sequelize.query(
                `SELECT * FROM products where product_name = '${product_name}'`,
                { type: QueryTypes.SELECT }
            );
        } else {
            categoryData = await sequelize.query(
                `SELECT * from products where created_by = ${createdBy} AND product_name = '${product_name}'`,
                { type: QueryTypes.SELECT }
            );
        }
        if (categoryData.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(categoryData);
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateProduct = async (req, res) => {
    try {
        await ImagesController.productImagesAuthentication(
            req,
            res,
            async function (err) {
                if (err) {
                    return res.status(400).json({ error: err });
                }

                if (!req.files) {
                    console.log(req.files)
                    return res.status(400).json({ error: "Error: No File Selected!" });
                }

                const {
                    product_id,
                    product_name,
                    product_description,
                    price,
                    category_name,
                } = req.body;
                // console.log(req.file.filename);
                const product_images = req.files
                    ? req.files.map((file) => file.filename)
                    : null;
                const createdBy = req.user.user_id;
                const userRole = req.user.user_role;

                if (
                    !product_id ||
                    !product_name ||
                    !product_description ||
                    !price ||
                    !category_name
                ) {
                    return res.status(400).json({ error: "Missing required fields" });
                }

                const [category] = await sequelize.query(
                    `SELECT * FROM categories WHERE category = '${category_name}'`,
                    { type: QueryTypes.SELECT }
                );

                console.log(category);

                let category_id = category?.category_id;

                // console.log(category);

                if (!category) {
                    return res.status(404).json({ message: "Category not found" });
                }

                const [product] = await sequelize.query(
                    `SELECT * FROM products WHERE product_id = ${product_id}`,
                    { type: QueryTypes.SELECT }
                );

                if (product.length === 0) {
                    return res.status(404).json({ error: "Product not found" });
                }

                if (userRole !== 1 && product.created_by !== createdBy) {
                    return res.status(403).json({ message: "Not Authorized" });
                }

                await sequelize.query(
                    `UPDATE products SET product_name = '${product_name}', product_description = :product_images, price = ${price}, product_images = '${product_images}', category_id = ${category_id} WHERE product_id = ${product_id} AND created_by = ${createdBy}`,
                    {
                        replacements: {
                            product_images: JSON.stringify(product_images),
                            type: QueryTypes.UPDATE,
                        },
                    }
                );
                res.status(200).json({ message: "Product updated successfully" });
            }
        );
    } catch (error) {
        console.error("Error Updating Category:", error);
    }
};

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;
    const createdBy = req.user.user_id;
    const userRole = req.user.user_role;
    // const { book_id } = req.body;

    try {
        const product = await sequelize.query(
            `SELECT * FROM products WHERE product_id = ${product_id}`,
            { type: QueryTypes.SELECT }
        );


        if (product.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        if (userRole !== 1 && product[0].created_by !== createdBy) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        await sequelize.query(
            `DELETE FROM products WHERE product_id = ${product_id}`,
            { type: QueryTypes.DELETE }
        );

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createProduct,
    fetchAllProduct,
    getProductByName,
    updateProduct,
    deleteProduct
}