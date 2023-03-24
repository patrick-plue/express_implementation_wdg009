const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodOverride = require("method-override");
const axios = require("axios");
const data = require("./test.json");
const { writeFile } = require("fs/promises");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "index.html"));
  //   res.sendFile(path.join(__dirname, "index.html"));
  res.end();
});

app.delete("/", (req, res) => {
  res.json(data);
});

app.set("view engine", "ejs");

app.get("/test-ejs", (req, res) => {
  res.render("index", { myTitle: "Hello World" });
});

app.get("/test-ejs2", (req, res) => {
  const users = ["Bob", "JOhn", "Jane"];
  res.render("user", { users });
});

app.put("/override", (req, res) => {
  console.log(req.body.text);
  res.end();
});

app.post("/showPost", (req, res) => {
  console.log(req.body);
  res.json({ message: "done" });
});

app.get("/getPost", (req, res) => {
  console.log(req.query);
  res.json({ message: "done" });
});

app.get("/number/:id", (req, res) => {
  res.send(`The number is ${req.params.id}`);
});

app.get("/postlist", async (req, res) => {
  try {
    const { data } = await axios("http://jsonplaceholder.typicode.com/posts/1");
    const promise = await writeFile("post.json", JSON.stringify(data), "utf-8");

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

app.get("/test", (req, res) => {
  res.send(`<h1>Hello Animal</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
