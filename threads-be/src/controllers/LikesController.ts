import { Request, Response } from "express";
import LikesService from "../services/LikesService";

class LikesController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await LikesService.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const threadId = parseInt(req.params.thread_id);

      const response = await LikesService.delete(threadId, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json("Something went wrong on the server!");
    }
  }
}

export default new LikesController();
