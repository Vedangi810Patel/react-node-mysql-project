const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");
const imageController = require("../middleware/ImageMiddlewareAuthentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "user";

//Insert New User
const Registration = async (req, res) => {
  console.log(req.body);
  try {
    await imageController.profilePictureAuthenticate(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Error: No File Selected!" });
      }

      const { firstname, lastname, email, password, gender, hobbies } =
        req.body;
      const profilePicture = req.file.filename;

      // Check if all required fields are present
      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !profilePicture ||
        !gender ||
        !hobbies
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if email is already registered
      const existingEmployee = await sequelize.query(
        `SELECT email FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );

      if (existingEmployee.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // password encryption
      const hashedPassword = await bcrypt.hash(password, 10);

      await sequelize.query(
        `INSERT INTO users (first_name, last_name, email, password, profile_pic, hobbies) 
            VALUES ('${firstname}', '${lastname}', '${email}', '${hashedPassword}', '${profilePicture}','${hobbies}')`,
        { type: QueryTypes.INSERT }
      );

      res.status(200).json({ message: "User created successfully" });
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  // console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await sequelize.query(
      `SELECT user_id,email,password,profile_pic,user_role FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    console.log("existingUser:", existingUser);

    if (existingUser.length === 0) {
      return res.status(400).json({ error: "Email not found" });
    }

    // console.log(password)
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser[0].password
    );

    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    if (passwordMatch) {
      const token = jwt.sign(
        {
          user_id: existingUser[0].user_id,
          email: existingUser[0].email,
          profilePicture: existingUser[0].profile_pic,
          user_role: existingUser[0].user_role,
        },
        SECRET_KEY
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  Registration,
  LogIn,
};
