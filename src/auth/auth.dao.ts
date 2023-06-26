import { db } from "../db";
import { UserLoginDto, UserRegisterDto } from "./auth.dto";

class AuthDao {
  async addUser(user: UserRegisterDto) {
    try {
      const data = await db.user.create({
        data: {
          ...user,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUser(user: UserLoginDto) {
    try {
      const data = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const data = await db.user.findUnique({
        where: {
          email,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default new AuthDao();
