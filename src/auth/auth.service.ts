import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authDao from "./auth.dao";
import { UserLoginDto, UserRegisterDto } from "./auth.dto";

dotenv.config();
class AuthService {
  async registerUser(data: UserRegisterDto) {
    const secret = process.env.JWT_SECRET || "ristek";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;

    const res = await authDao.addUser(data);

    if (!res) {
      return "User already exists";
    }

    const token = jwt.sign(
      { email: data.email, full_name: data.full_name },
      secret,
      {
        header: {
          alg: "HS256",
          typ: "JWT",
        },
      }
    );

    return token;
  }

  async loginUser(data: UserLoginDto) {
    const user = await authDao.getUser(data);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const secret = process.env.JWT_SECRET || "ristek";

    const token = jwt.sign({ email: user.email }, secret, {
      header: {
        alg: "HS256",
        typ: "JWT",
      },
    });

    return token;
  }
}

export default new AuthService();
