import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { loginSchema, registerSchema } from "../utils/validators/auth";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response) {
    try {

      const data = req.body

      const { error, value } = registerSchema.validate(data)

      if (error) {
        return res.status(500).json({
          error: error.details[0].message
        })
      }

      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email
        }
      })

      if (checkEmail > 0) {
        return res.status(400).json({
          error: "Email is already registered!"
        })
      }

      const password = await bcrypt.hash(value.password, 10)

      const user = this.authRepository.create({
        full_name: value.full_name,
        username: value.username,
        email: value.email,
        password: password,
      })

      const createdUser = await this.authRepository.save(user)

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async login(req: Request, res: Response) {
    try {

      const data = req.body

      const { error, value } = loginSchema.validate(data)

      if (error) {
        return res.status(500).json({
          error: error.details[0].message
        })
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email
        },
        select: ["id", "full_name", "email", "username", "password"]
      })

      if (!checkEmail) {
        return res.status(400).json({
          error: "Email / password is wrong!"
        })
      }

      const isPasswordValid = await bcrypt.compare(value.password, checkEmail.password)

      if (!isPasswordValid) {
        return res.status(400).json({
          error: "Email / password is wrong!"
        })
      }

      const user = this.authRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        username: checkEmail.username,
        email: checkEmail.email,
      })

      const token = jwt.sign({ user }, "dumbwaysterbaik", { expiresIn: "1h" })

      return res.status(200).json({
        user,
        token
      });
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id
        },
      })

      return res.status(200).json({
        user,
        message: "Token is valid!"
      });
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }
}

export default new AuthService();
