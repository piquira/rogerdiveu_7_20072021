const mysql = require('mysql2');

const db = mysql.createConnection({
	host:process.env.DB_LOCALHOST,
    user:process.env.DB_IDENTIFIANT,
    password:process.env.DB_PASSWORD,
    database:'groupomania'
});

db.connect(function(err) { 
  if (err) throw err;
  console.log('Connecté!')
});
  

module.exports = db;