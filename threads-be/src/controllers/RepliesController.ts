import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

class RepliesController {
    find(req: Request, res: Response) {
        RepliesService.find(req,res)
    }

    create(req: Request, res: Response) {
        RepliesService.create(req,res)
    }
}

export default new RepliesController