const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const authenticate = require("./middlewares/authenticate");
const modelRouter = require("./routes/modelRouter");
const vfdRouter = require("./routes/vfdRouter");
const ruleRouter = require("./routes/decisionRuleRouter");
const ruleTableRouter = require("./routes/ruleTableRouter");
const authRouter = require("./routes/authRouter");
const cGategroupRouter = require("./routes/cGateGroupRouter");
const cGateRouter = require("./routes/cGateRouter");
const siteRouter = require("./routes/siteRouter");

const jsonServerRouter = jsonServer.router(path.join(__dirname, "db.json"));
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/models", authenticate, modelRouter);
app.use("/vfd", authenticate, vfdRouter);
app.use("/rules", authenticate, ruleRouter);
app.use("/ruleTables", authenticate, ruleTableRouter);
app.use("/cGateGroup", authenticate, cGategroupRouter);
app.use("/cGate", authenticate, cGateRouter);
app.use("/site", authenticate, siteRouter);
app.use("/", authRouter);

// Use JSON Server for user management endpoints
app.use("/users", jsonServerRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
