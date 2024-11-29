const { Pool } = require("pg"); // диструктуризация
const Data = require("./data_pg");

class PostgreSQL {
  pool;

  constructor(user, host, database, password, port) {
    this.pool = new Pool({
      user,
      host,
      database,
      password,
      port,
    });
  }

  getUsers(req, res) {
    this.pool
      .query("SELECT id, login, password, email, tel FROM users")
      .then((result) => {
        res.status(200).json(result.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  createUser(req, res) {
    const { login, password, email, tel } = req.body;
    const singupReadyPass = "/home/signup/signup_ready";
    this.pool
      .query(
        "INSERT INTO users (login, password, email, tel) VALUES ( $1, $2, $3, $4)",
        [login, password, email, tel]
      )
      .then((result) => {
        console.log(`successfully redirect ${singupReadyPass}`);
        res.redirect(singupReadyPass);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  }

  deleteUser(req, res) {
    const { login, password } = req.body;
    const removalReadyPass = "/home/removal/removal_ready";
    this.pool
      .query("DELETE FROM users WHERE login = $1 AND password = $2", [
        login,
        password,
      ])
      .then((result) => {
        console.log(`successfully redirect ${removalReadyPass}`);
        res.redirect(removalReadyPass);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  updateUser(req, res) {
    const { new_login, new_password, new_email, new_tel, login, password } =
      req.body;
    const updateReadyPass = "/home/update/update_ready";
    this.pool
      .query(
        "UPDATE users SET login = $1, password = $2, email = $3, tel = $4 WHERE login = $5 AND password = $6 ",
        [new_login, new_password, new_email, new_tel, login, password]
      )
      .then((result) => {
        console.log(`successfully redirect ${updateReadyPass}`);
        res.redirect(updateReadyPass);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  testConnection() {
    this.pool
      .query("SELECT current_database()")
      .then((result) => {
        console.log("Connected to database:", result.rows[0].current_database);
      })
      .catch((err) => {
        console.error("Error connecting to database:", err.message);
      });
  }
}

const postgreSQL = new PostgreSQL(
  Data.DB_USER,
  Data.DB_HOST,
  Data.DB_NAME,
  Data.DB_PASSWORD,
  Data.DB_PORT
);

postgreSQL.testConnection();

module.exports = postgreSQL;
