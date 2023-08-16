import * as amqp from "amqplib";
import "dotenv/config";
import { cloudinaryConfig } from "../libs/cloudinary";
import ThreadWorker from "./ThreadWorker";
import { AppDataSource } from "../data-source";

class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinaryConfig();
        const connection = await amqp.connect("amqp://localhost");

        // register the worker
        ThreadWorker.create("threads-queue", connection);
      })
      .catch((error) => console.log(error));
  }
}

export default new WorkerHub();
