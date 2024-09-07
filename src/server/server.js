const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { serverConfig } = require("../config/config");
const { whitelist } = require("../config/whitelist");
require("../dbConnection/dbConnection");

const app = express();
const port = serverConfig.port || 4000;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Acceso CORS no permitido"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("../routes/user.routes");
const workshopRoutes = require("../routes/workshop.routes");
const eventRoutes = require("../routes/event.routes");
const commentRoutes = require("../routes/comment.routes");
const requestRoutes = require("../routes/request.routes");

app.use("/api/users", userRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/requests", requestRoutes);

app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});
