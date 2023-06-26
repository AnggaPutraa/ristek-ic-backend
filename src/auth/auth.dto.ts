import { User } from "@prisma/client";

type UserRegisterDto = Omit<User, "id">;
type UserLoginDto = Omit<User, "id" | "full_name">;

export { UserRegisterDto, UserLoginDto };
