require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");

const { isAdmin } = require("./middleware/isAdmin");

const authRouter = require("./routes/api/auth");
const adminRouter = require("./routes/api/admin");
const bucketRouter = require("./routes/api/bucket");
const assetsRouter = require("./routes/api/assets");

const app = express();

require("./seeders/adminSeed")();

app.use(passport.initialize());
require("./services/passport")(passport);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(
  "/media",
  passport.authenticate("jwt", { session: false }),
  express.static(process.env.MEDIA_ROOT)
);
app.use(express.static(path.join(__dirname, "client/dist")));

app.use(
  "/api/admin",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  adminRouter
);
app.use("/api/auth", authRouter);
app.use(
  "/api/bucket",
  passport.authenticate("jwt", { session: false }),
  bucketRouter
);
app.use(
  "/api/bucket/:bucket_id/assets",
  passport.authenticate("jwt", { session: false }),
  assetsRouter
);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

module.exports = app;
