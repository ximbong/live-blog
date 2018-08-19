const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  passportLocalMongoose = require("passport-local-mongoose"),
  session = require("express-session"),
  path = require("path"),
  loggedIn = require("./middleware"),
  User = require("./models/user"),
  key = require("./config/key");

const categoryRoutes = require("./routes/category"),
  featuredRoutes = require("./routes/featured"),
  postRoutes = require("./routes/post"),
  profileRoutes = require("./routes/profile"),
  registerRoutes = require("./routes/register"),
  loginRoutes = require("./routes/login"),
  logoutRoutes = require("./routes/logout"),
  authRoutes = require("./routes/auth"),
  popularRoutes = require("./routes/popular");

const mongoDB = `mongodb://${key.mLab_ID}:${
  key.mLab_pw
}@ds135061.mlab.com:35061/simple-blog`;

mongoose.connect(mongoDB);

// Serve any static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  session({
    secret: "ximbong91023",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

//routes that require login
app.use("/category", loggedIn, categoryRoutes);
app.use("/featured", loggedIn, featuredRoutes);
app.use("/post", loggedIn, postRoutes);
app.use("/profile", loggedIn, profileRoutes);
app.use("/auth", loggedIn, authRoutes);
app.use("/popular", loggedIn, popularRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
