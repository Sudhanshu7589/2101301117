const express = require("express");
const app = express(); 

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
app.use(cors());


const registerRoutes=require("./routes/Register");
const productRoutes=require("./routes/Product");


dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1",registerRoutes);
app.use("/api/v1",productRoutes);


//database connect
database.connect();



app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})