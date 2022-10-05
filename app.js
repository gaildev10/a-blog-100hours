const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { MongoClient, ServerApiVersion } = require("mongodb");

//bring in Mongoose
const mongoose = require("mongoose");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//bring in MethodOverride
const methodOverride = require("method-override");

// const blogRouter = require("./routes/blogs");
// const Blog = require("./models/Blog");
const port = process.env.PORT || 5000;
const app = express();

// Passport Config
require("./config/passport")(passport);

//DB Config
// const db = require('./config/keys').MongoURI;

// //connect to Mongo
// mongoose.connect(db, {
//   useNewUrlParser: true})
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err))

mongoose
  .connect(
    "mongodb+srv://gilesgr1:MongoDB10@cluster0.lahdbch.mongodb.net/Blogs",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
//set template engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// //route for the index
// app.get("/", async (request, response) => {
//   let blogs = await Blog.find().sort({ timeCreated: "desc" });
//   //   { // const blogs = [
//   //     title: "The information we do not need",
//   //     snippet:
//   //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
//   //     author: "Gail Giles",
//   //     createdAt: new Date(),
//   //     img: "placeholder.jpg",
//   //   },
//   //   {
//   //     title: "The information we do not need",
//   //     snippet:
//   //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
//   //     author: "Gail Giles",
//   //     createdAt: new Date(),
//   //     img: "placeholder.jpg",
//   //   },
//   //   {
//   //     title: "The information we do not need",
//   //     snippet:
//   //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
//   //     author: "Gail Giles",
//   //     createdAt: new Date(),
//   //     img: "placeholder.jpg",
//   //   },
//   // ];
//   response.render("index", { blogs: blogs });
// });

app.use("public/uploads/images/", express.static("./public/uploads/images"));
// app.use("/blogs", blogRouter);

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/blogs", require("./routes/blogs"));
app.use(express.static("public"));

//listen port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
