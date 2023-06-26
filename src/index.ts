import express from "express";
import morgan from "morgan";
import { router as authRouter } from "./auth/auth.routes";
import { router as postRouter } from "./post/post.routes";

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

router.use("/auth", authRouter);
router.use("/post", postRouter);

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
