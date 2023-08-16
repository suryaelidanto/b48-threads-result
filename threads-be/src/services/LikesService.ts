import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/Like";

class LikesService {
  private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const checkLike = await this.likeRepository.count({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: req.body.thread_id,
          },
        },
      });

      if (checkLike > 0) {
        const deletedLike = this.likeRepository.delete({
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: req.body.thread_id,
          },
        });
        return res.status(200).json(deletedLike);
      }

      const like = this.likeRepository.create({
        thread: {
          id: req.body.thread_id,
        },
        user: {
          id: loginSession.user.id,
        },
      });

      const createdLike = this.likeRepository.save(like);

      return res.status(200).json(like);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const threadId = parseInt(req.params.thread_id);
      const like = await this.likeRepository.findOne({
        where: {
          thread: {
            id: threadId,
          },
          user: {
            id: loginSession.user.id,
          },
        },
      });

      if (!like) {
        return res.status(404).json("Like ID not found!");
      }

      const deletedLike = this.likeRepository.delete({
        id: like.id,
      });

      return res.status(200).json(like);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }
}

export default new LikesService();
