const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config.json");
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const volumeRoutes = require("./routes/volumeRoutes");
const dimensionRoutes = require("./routes/dimensionRoutes");
const BodyParser = require("body-parser");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/volume", volumeRoutes);
app.use("/api/dimension", dimensionRoutes);

mongoose.connect(config.mongodb_url).then(() => console.log("Connected to Mongodb.")).catch((e) => console.log(e.message));

app.listen(8000, () =>  console.log("App is running on port 8000"));