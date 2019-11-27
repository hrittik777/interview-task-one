"use strict"
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();
const db = require("./queries");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// root
app.get("/", (req, res) => { res.json({ message: "Fyle Interview Task submitted by Hrittik Bhattacharjee on 27/11/2019" }) });

app.post("/user", (req, res) => {
	const user = { username: "default" }
	jwt.sign({ user }, process.env.SECRET, {expiresIn: 7*24*60*60}, (err, token) => {
		res.json({ token });
	});
});

// retrieve all banks in db
app.get("/bank", db.getBanks);

// retrieve all branches in db
app.get("/branch", db.getBranches);

// retrieve branch details based on IFSC code
app.get("/branch/:ifsc", verifyToken, db.getBranchDetails);

// retrieve all bank branches based on Bank Name, City, and Limit & Offset values for results
app.get("/bank/:bank_name&:city&:limit&:offset", verifyToken, db.getBankDetails);

// function for verifying jwt
function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if(typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		req.token = bearerToken;
		next();
	} else res.sendStatus(403);
}

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});