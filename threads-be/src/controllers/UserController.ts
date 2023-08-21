import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async findOne(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await UserService.findOne(loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
} 

export default new UserController();
