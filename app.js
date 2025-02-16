const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Kubernetes!");
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/nohealthz", (req, res) => {
  res.status(500).send("Service Unavailable");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
