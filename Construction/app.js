const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require('body-parser');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const thu_khoRouter = require("./routes/thu_kho");
const ke_toanRouter = require("./routes/ke_toan");
const checkoutRouter = require("./routes/checkout");
const productRouter = require("./routes/product");
const productsRouter = require("./routes/products");
const searchRouter = require("./routes/search");
const randomRouter = require("./routes/random");

var app = express();

//body-passer
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

app.use("/static", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/thukho", thu_khoRouter);
app.use("/ketoan", ke_toanRouter);
app.use("/checkout", checkoutRouter);
app.use("/product", productRouter);
app.use("/products", productsRouter);
app.use("/search", searchRouter);
app.use("/random", randomRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;