const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Pool = require("pg").Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'fyle',
	password: 'password',
	port: 5432
});

const getBanks = (req, res) => {
	pool.query(`SELECT * FROM banks`, (err, result) => {
		if(err) {
			throw err;
		}
		res.status(200).json(result.rows);
	});
}

const getBranches = (req, res) => {
	pool.query(`SELECT * FROM branches`, (err, result) => {
		if(err) {
			throw err;
		}
		res.status(200).json(result.rows);
	});
}

const getBranchDetails = (req, res) => {
	jwt.verify(req.token, process.env.SECRET, (err, username) => {
		if(err) res.sendStatus(403);
		else {
			const ifsc = req.params.ifsc;
			pool.query("SELECT * FROM branches WHERE ifsc=$1", [ifsc], (err, result) => {
				if(err) {
					throw err;
				}
				res.status(200).json(result.rows);
			});
		}
	});
}

const getBankDetails = (req, res) => {
	const bank_name = req.params.bank_name;
	const city = req.params.city;
	const limit = req.params.limit;
	const offset = req.params.offset;
	pool.query("SELECT * FROM bank_branches WHERE bank_name=$1 AND city=$2 LIMIT $3 OFFSET $4", [bank_name, city, limit, offset], (err, result) => {
		if(err) {
			throw err;
		}
		res.status(200).json(result.rows);
	});
}

module.exports = { getBanks, getBranches, getBranchDetails, getBankDetails };