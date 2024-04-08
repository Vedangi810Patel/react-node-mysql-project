const { QueryTypes } = require('sequelize');
const sequelize = require("../configs/dbConfig");

const createBook = async (req, res) => {
    try {
        const { book_id, title, book_description, publish_year, quantity_available } = req.body;

        // Check if all required fields are present
        if (!book_id || !title || !book_description || !publish_year || !quantity_available) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if email is already registered
        const existingBook = await sequelize.query(
            `SELECT title FROM books WHERE title = '${title}'`,
            { type: QueryTypes.SELECT }
        );

        if (existingBook.length > 0) {
            return res.status(400).json({ error: "Book already exists" });
        }

        await sequelize.query(
            `INSERT INTO books (book_id, title, book_description, publish_year, quantity_available) 
            VALUES (${book_id}, '${title}', '${book_description}', ${publish_year}, ${quantity_available})`,
            { type: QueryTypes.INSERT }
        );
        res.status(200).json({ message: "Book Added successfully" });
    } catch (error) {
        console.error("Error adding Book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fetchAllBooks = async (req, res) => {
    try {
        const users = await sequelize.query(
            `SELECT * from books`, { type: QueryTypes.SELECT }
        );

        res.status(200).json(users);
    } catch (err) {
        console.error("Unable to Fetch :", err);
    }
};


const getBookByTitle = async (req, res) => {
    const { title } = req.body;
    try {
        const result = await sequelize.query(
            `SELECT * FROM books WHERE title = '${title}'`, { type: QueryTypes.SELECT }
        );
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.log("Error Detected", error);
    }
};


const updateBook = async (req, res) => {
    const {
        book_id,
        title,
        book_description,
        publish_year,
        quantity_available,
    } = req.body;

    if (!book_id || !title || !book_description || !publish_year || !quantity_available) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sequelize.query(
            `UPDATE books SET 
            book_id = ${book_id},
            title = '${title}',
            book_description = '${book_description}',
            publish_year = '${publish_year}',
            quantity_available = '${quantity_available}' 
            WHERE book_id = ${book_id}`,
            { type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: "Book updated successfully" });
        // res.status(200).json(res.send("Book Updated Sucessfully !"));
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

const deleteBook = async (req, res) => {
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
    createBook,
    fetchAllBooks,
    getBookByTitle,
    updateBook,
    deleteBook
}