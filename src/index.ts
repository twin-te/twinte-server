import express from "express";

const app = express();

app.get("/", (req, res) => {
  req;
  res.send("Hello");
});

app.listen(3333, () => console.log("listening on port 3000!"));
