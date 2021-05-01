const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://username:password@cluster0-ypylx.mongodb.net/engineerBabu";

const { userRouter } = require("./routes/user.js");
const { hobbyRouter } = require("./routes/hobby.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.use("/users", userRouter);
app.use("/hobby", hobbyRouter);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => console.log(err));
