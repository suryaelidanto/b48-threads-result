import * as express from 'express'
import ThreadsController from '../controllers/ThreadsController'

const router = express.Router()

router.get("/", (req,res) => {
    res.send("Hello World from v1")
})

router.get("/threads", ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread", ThreadsController.create)
router.patch("/thread/:id", ThreadsController.update)
router.delete("/thread/:id", ThreadsController.delete)



export default router
