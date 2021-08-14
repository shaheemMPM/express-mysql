const mysql = require("mysql");
let instance = null;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "atm_system",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log("error in read", error);
    }
  }

  async getUserByUsername(username) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = '${username}'`;

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log("error in read", error);
    }
  }

  async updateBalance(balance, username) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `UPDATE users SET balance = ${balance} WHERE username='${username}'`;

        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbService;
