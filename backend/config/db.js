let mysql = require("mysql");

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cedoc'
  /*host     : 'us-cdbr-east-03.cleardb.com',
	user     : 'bea74273ffbcac',
	password : '6ed2d683',
	database : 'heroku_71027b9743e64eb'*/
  });
  
  connection.connect();
  
  module.exports = connection;