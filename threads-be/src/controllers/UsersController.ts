import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class UsersController {
  async find(req: Request, res: Response) {
    try {
      const response = await UsersServicee3.find(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UsersController();
