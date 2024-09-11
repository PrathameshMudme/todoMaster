const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT || 8001;
// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Tasker is LIVE"));
app.use("/api/todos", todoRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
