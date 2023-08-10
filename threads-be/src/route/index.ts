import * as express from 'express'
import ThreadsController from '../controllers/ThreadsController'
import AuthController from '../controllers/AuthController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello World from v1")
})

router.get("/threads", authenticate, ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread", authenticate, ThreadsController.create)
router.patch("/thread/:id", ThreadsController.update)
router.delete("/thread/:id", ThreadsController.delete)

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", authenticate, AuthController.check)


export default router
