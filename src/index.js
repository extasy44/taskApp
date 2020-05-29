const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

//Routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 2000;

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
