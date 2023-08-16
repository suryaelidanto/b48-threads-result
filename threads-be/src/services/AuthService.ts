import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { loginSchema, registerSchema } from "../utils/validators/auth";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(reqBody: any): Promise<any> {
    try {
      const { error } = registerSchema.validate(reqBody);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const checkEmail = await this.authRepository.count({
        where: {
          email: reqBody.email,
        },
      });

      if (checkEmail > 0) {
        throw new Error("Email is already registered!");
      }

      const password = await bcrypt.hash(reqBody.password, 10);

      const user = this.authRepository.create({
        full_name: reqBody.full_name,
        username: reqBody.username,
        email: reqBody.email,
        password: password,
      });

      await this.authRepository.save(user);

      return {
        message: "Register success!",
        user: user,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async login(reqBody: any): Promise<any> {
    try {
      const { error } = loginSchema.validate(reqBody);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: reqBody.email,
        },
        select: ["id", "full_name", "email", "username", "password"],
      });

      if (!checkEmail) {
        throw new Error("Email / password is wrong!");
      }

      const isPasswordValid = await bcrypt.compare(
        reqBody.password,
        checkEmail.password
      );

      if (!isPasswordValid) {
        throw new Error("Email / password is wrong!");
      }

      const user = this.authRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        username: checkEmail.username,
        email: checkEmail.email,
      });

      const token = jwt.sign({ user }, "dumbwaysterbaik", { expiresIn: "1h" });

      return {
        message: "Login success!",
        user: user,
        token: token,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      return {
        message: "Token is valid!",
        user: user,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new AuthService();
