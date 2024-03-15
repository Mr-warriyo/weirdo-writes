// REQUIRED MODULES
const express = require("express");
const { connectDB } = require("./db");
const urlR = require("./routes/url");
const cors = require("cors");

// ENV SETUP
require('dotenv').config();
const { MONGO_USER, MONGO_PASS } = process.env;

// MONGOOSE DB CONNECTION
connectDB(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@main.ue2vhrg.mongodb.net/`);

// EXPRESS APP
const app = express();
const PORT = 8081;
app.use(express.json());
app.use(cors());

app.use("/", urlR);

app.listen(PORT, () => {
    console.log(`Server Running at PORT: ${PORT}`);
});