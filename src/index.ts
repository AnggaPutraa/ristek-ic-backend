import express from "express";
import morgan from "morgan";

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "dev";

app.use(express.json());
app.use(
  ENV === "dev"
    ? morgan("dev")
    : morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});