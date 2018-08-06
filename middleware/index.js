function loggedIn(req, res, next) {
  if (req.user) {
    console.log("logged in already");
    next();
  } else {
    console.log("not logged in");
    res.send(false);
  }
}

module.exports = loggedIn;
