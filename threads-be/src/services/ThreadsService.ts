import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      const limit = +reqQuery.limit ?? 0;

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
        replice: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id === loginSession.user.id
        ),
      }));
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "replies", "likes"],
      });

      return {
        ...thread,
        replies_count: thread.replies.length,
        likes_count: thread.likes.length,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  // async create(reqBody: any, loginSession: any): Promise<any> {
  //   try {
  //     const { error } = createThreadSchema.validate(reqBody);

  //     if (error) {
  //       throw new Error(error.details[0].message);
  //     }

  //     cloudinary.config({
  //       cloud_name: "dkg30pa5s",
  //       api_key: "538241327826783",
  //       api_secret: "Aba56Exrc2RYucZua1WHiaHiyR0",
  //     });

  //     const cloudinaryResponse = await cloudinary.uploader.upload(
  //       "./uploads/" + reqBody.image
  //     );

  //     const thread = this.threadRepository.create({
  //       content: reqBody.content,
  //       image: cloudinaryResponse.secure_url,
  //       user: {
  //         id: loginSession.user.id,
  //       },
  //     });

  //     await this.threadRepository.save(thread);

  //     return thread;
  //   } catch (err) {
  //     throw new Error("Something went wrong on the server!");
  //   }
  // }

  // async delete(reqyBody : any) : Promise<any> {
  //   try {
  //     const id = parseInt(req.params.id);
  //     const thread = await this.threadRepository.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     if (!thread) {
  //       return res.status(404).json("Thread ID not found!");
  //     }

  //     const deletedThread = this.threadRepository.delete({
  //       id: id,
  //     });

  //     return res.status(200).json(thread);
  //   } catch (err) {
  //     return res.status(500).json("Something went wrong on the server!");
  //   }
  // }
}

export default new ThreadsService();
