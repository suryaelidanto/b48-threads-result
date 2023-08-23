import { Request, Response } from "express-serve-static-core";
import { sendMessageToQueue } from "../libs/rabbitmq";
import { createThreadSchema } from "../utils/validators/thread";

class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = "threads-queue";
      const filename = res.locals.filename;

      const data = {
        content: req.body.content,
        image: filename,
      };

      const { error } = createThreadSchema.validate(data);

      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      const loginSession = res.locals.loginSession;

      const payload = {
        content: data.content,
        image: data.image,
        user_id: loginSession.user.id,
      };

      const errorQueue = await sendMessageToQueue(queueName, payload);

      if (errorQueue) {
        return res.status(500).json({
          error: errorQueue,
        });
      }

      res.status(200).json({
        message: "Thread is queued!",
        data: payload,
      });
    } catch (err) {
      console.log("Queue error!", err);
      res.status(500).json({
        error: "Something wrong in server!",
      });
    }
  }
}

export default new ThreadQueue();
