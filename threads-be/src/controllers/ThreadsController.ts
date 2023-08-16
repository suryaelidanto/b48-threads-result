import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";

class ThreadsController {
  async find(req: Request, res: Response) {
    try {
      const response = await ThreadsService.find(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadsService.findOne(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  //   async create(req: Request, res: Response) {
  //     try {
  //       const image = res.locals.filename;
  //       const loginSession = res.locals.loginSession;

  //       const reqBody = {
  //         content: req.body.content,
  //         image,
  //       };

  //       const response = await ThreadsService.create(reqBody, loginSession);
  //       return res.status(200).json(response);
  //     } catch (err) {
  //       return res
  //         .status(500)
  //         .json({ error: "Something went wrong on the server!" });
  //     }
  //   }

  //   async update(req: Request, res: Response) {
  //     try {
  //       const response = await ThreadsService.update(req, res);
  //       return res.status(200).json(response);
  //     } catch (err) {
  //       return res
  //         .status(500)
  //         .json({ error: "Something went wrong on the server!" });
  //     }
  //   }

  //   async delete(req: Request, res: Response) {
  //     try {
  //       const response = await ThreadsService.delete(req, res);
  //       return res.status(200).json(response);
  //     } catch (err) {
  //       return res
  //         .status(500)
  //         .json({ error: "Something went wrong on the server!" });
  //     }
  //   }
}

export default new ThreadsController();
