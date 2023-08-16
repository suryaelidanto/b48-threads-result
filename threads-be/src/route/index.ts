import * as express from "express";
import AuthController from "../controllers/AuthController";
import ThreadsController from "../controllers/ThreadsController";
import { authenticate } from "../middlewares/auth";
import { upload } from "../middlewares/uploadFile";
import ThreadsQueue from "../queues/ThreadsQueue";
import ThreadWorker from "../workers/ThreadWorker";
import { EventEmitter } from "events";
import RepliesController from "../controllers/RepliesController";
import LikesController from "../controllers/LikesController";

const router = express.Router();

router.get("/threads", authenticate, ThreadsController.find);
router.get("/thread/:id", ThreadsController.findOne);
router.post("/thread", authenticate, upload("image"), ThreadsQueue.create);
router.patch("/thread/:id", ThreadsController.update);
router.delete("/thread/:id", ThreadsController.delete);

router.get("/replies", authenticate, RepliesController.find);
router.post("/reply", authenticate, RepliesController.create);

router.post("/like", authenticate, LikesController.create);
router.delete("/like/:thread_id", authenticate, LikesController.delete);

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", authenticate, AuthController.check);

router.get("/notifications", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("event: message\n");
  setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: "apa gitu" })}\n`);
  }, 1000);
});

// ThreadWorker.emitter.on("message", () => {
//   console.log("Event message received!");
// });

export default router;
