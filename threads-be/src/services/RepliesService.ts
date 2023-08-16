import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Reply } from "../entities/Reply";

class RepliesService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async find(req: Request, res: Response) {
    try {
      const threadId = parseInt(req.query.thread_id as string);
      const replies = await this.replyRepository.find({
        relations: ["user"],
        where: {
          thread: {
            id: threadId,
          },
        },
        order: {
          id: "DESC",
        },
      });

      return res.status(200).json(replies);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      // create object biar typenya sesuai
      const reply = this.replyRepository.create({
        content: req.body.content,
        user: {
          id: loginSession.user.id,
        },
        thread: {
          id: req.body.thread_id,
        },
      });

      // insertion ke database
      const createdReply = this.replyRepository.save(reply);

      return res.status(200).json(reply);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }
}

export default new RepliesService();
