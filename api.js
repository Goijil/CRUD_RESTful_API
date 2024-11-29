const express = require("express");
const path = require("path");
const SQL = require("./PostgreSQL");

const homeRouter = express.Router();
const signupRouter = express.Router();
const removalRouter = express.Router();
const updateRouter = express.Router();
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

homeRouter.get("/", (request, response) => {
  const filePath = path.join(__dirname, "api_home_page.html");
  response.sendFile(filePath);
});

homeRouter.get("/users", (req, res) => {
  SQL.getUsers(req, res);
});

homeRouter.get("/signup", (request, response) => {
  const filePath = path.join(__dirname, "api_signup_page.html");
  response.sendFile(filePath);
});

homeRouter.get("/removal", (request, response) => {
  const filePath = path.join(__dirname, "api_user_removal.html");
  response.sendFile(filePath);
});

homeRouter.get("/update", (request, response) => {
  const filePath = path.join(__dirname, "api_update_page.html");
  response.sendFile(filePath);
});

signupRouter.post("/signup_check", (req, res) => {
  SQL.createUser(req, res);
});

signupRouter.get("/signup_ready", (req, res) => {
  const filePath = path.join(__dirname, "api_signup_ready.html");
  res.sendFile(filePath);
});

removalRouter.post("/removal_check", (req, res) => {
  SQL.deleteUser(req, res);
});

removalRouter.get("/removal_ready", (req, res) => {
  const filePath = path.join(__dirname, "api_removal_ready.html");
  res.sendFile(filePath);
});

updateRouter.post("/update_check", (req, res) => {
  SQL.updateUser(req, res);
});

updateRouter.get("/update_ready", (req, res) => {
  const filePath = path.join(__dirname, "api_update_ready.html");
  res.sendFile(filePath);
});

homeRouter.use("/signup", signupRouter);
homeRouter.use("/removal", removalRouter);
homeRouter.use("/update", updateRouter);
app.use("/home", homeRouter);

app.listen(PORT, () => {
  console.log(`Server for API is running on port ${PORT}`);
});
