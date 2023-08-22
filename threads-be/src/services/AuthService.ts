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

      const isEmailRegistered = await this.authRepository.count({
        where: {
          email: reqBody.email,
        },
      });

      if (isEmailRegistered > 0) {
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
        message: "Registration successful!",
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

      const user = await this.authRepository.findOne({
        where: {
          email: reqBody.email,
        },
        select: ["id", "full_name", "email", "username", "password"],
      });

      if (!user) {
        throw new Error("Email / password is wrong!");
      }

      const isPasswordValid = await bcrypt.compare(
        reqBody.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Email / password is wrong!");
      }

      const token = jwt.sign({ user }, "dumbwaysterbaik", { expiresIn: "1d" });

      return {
        message: "Login successful!",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
        },
        token: token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        relations: ["followers", "followings"],
      });

      return {
        message: "Token is valid!",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          picture: user.picture,
          description: user.description,
          followers_count: user.followers.length,
          followings_count: user.followers.length,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AuthService();
