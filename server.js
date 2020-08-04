const express = require("express");
const path = require("path");

const connectDB = require("./db");

const app = express();

//Connect Database
connectDB();

//Use Nginx in production
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "..", "..", "AWS", "public"))
);

app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/products", require("./routes/product"));
app.use("/api/order", require("./routes/order"));

//Serve static assets if in production
/* if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} */

//const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
