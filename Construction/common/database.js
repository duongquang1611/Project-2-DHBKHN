var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "duongquang",
  database: "project2"
});

connection.connect();

const getConnection = () => {
  if (!connection) {
    connection.connect();
  }
  return connection;
};

module.exports = {
  getConnection: getConnection
};
