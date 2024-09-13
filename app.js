const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const checkToken =  ("/api", (req, res, next) => {
  let { token } = req.query;
  if(token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
});

app.get("/api", checkToken, (req, res) => {
  res.send("data");
})


app.use("/random", (req, res) => {
  res.send("This page is only for random string");
});
app.use( (req, res, next) => {
  req.responseTime = new Date(Date.now()).toString();
   console.log(req.method, req.path, req.hostname, req.responseTime);
   next();
});

app.use((req, res, next) => {
  res.send("Page not found");
  next();
});
app.get("/", (req, res) => {
  res.send("Hi, i'm root.");
});

app.get("/random", (req, res, next) => {
  res.send("This is a random page");
  next();
});

app.get("/err", (req, res) => {
  abcd = abcd;
});


app.get("/admin", (req, res, next) => {
  throw new ExpressError(403, "Access to admin is Forbidden");
  next();
});

app.use( (err, req, res, next) => {
  let {status=500, message="Some Error occured"} = err;
  res.status(status).send(message);
});

// app.use( (err, req, res, next) => {
//   console.log("------Error middle ware2-------");
//   next(err);
// });

app.listen(8080, () => {
  console.log("Server listing to port 8080");
});