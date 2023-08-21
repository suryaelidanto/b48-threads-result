import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit ?? 0);

      const threads = await this.threadRepository.find({
        relations: ["user", "likes.user", "replies"],
        order: {
          id: "DESC",
        },
        take: limit,
      });

      return threads.map((element) => ({
        id: element.id,
        content: element.content,
        image: element.image,
        posted_at: element.posted_at,
        user: element.user,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id === loginSession.user.id
        ),
      }));
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "replies", "likes.user"],
      });

      return {
        id: thread.id,
        content: thread.content,
        image: thread.image,
        posted_at: thread.posted_at,
        user: thread.user,
        replies_count: thread.replies.length,
        likes_count: thread.likes.length,
        is_liked: thread.likes.some(
          (like: any) => like.user.id === loginSession.user.id
        ),
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new ThreadsService();
