const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { PORT } = require("./config");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();
const authRoutes = require("./routes/auth")
//enables Cross-Origin Resource Sharing on all origins that may not be on port
app.use(cors());
//parse incoming request bodies
app.use(express.json());
//Log request in console
app.use(morgan("tiny"));
app.use("/auth", authRoutes)
app.use((res, req, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message: status },
  });
});
//Initialize server
app.listen(PORT, () => {
  console.log("🚀 Server running http://localhost:" + PORT);
});
