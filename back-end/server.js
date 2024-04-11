const express = require("express");
const sequelize = require("./configs/dbConfig");
const path = require("path");
const bodyParser = require("body-parser");
const route = require("./routes/Store_Routes");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const app = express();

// app.use(cors());

// app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use(cookieParser());

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  "/public/assets",
  express.static(path.join(__dirname, "public", "assets"))
);

app.use(route.Routes);

sequelize;
app.listen(5000);
