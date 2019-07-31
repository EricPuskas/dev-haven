require("dotenv").config();
const { PORT, NODE_ENV } = process.env;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const express = require("express");
const passport = require("passport");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const time = 2500000000; // 1 month
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Initiialize Express
const app = express();

// Middleware
// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(require("prerender-node"));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/auth")(passport);

// Define Routes
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));

app.use(express.static("client/build", { maxAge: time }));
app.use((req, res, next) => {
  res.header("Cache-Control", "max-age= 2500000000");
  next();
});

// Serve static assets if in production
if (NODE_ENV === "production") {
  // Set static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen to Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
