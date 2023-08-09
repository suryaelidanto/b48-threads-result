import { AppDataSource } from "./data-source"
import * as express from 'express'
import { Request, Response } from "express"
import router from "./route"
import * as cors from "cors"

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(cors())
    app.use(express.json())
    app.use("/api/v1", router) // group route

    app.get("/", (req: Request, res: Response) => {
        res.json({
            message: "halo  test nodemon"
        })
    })


    app.listen(port, () => {
        console.log("Server running in port " + port)
    })

}).catch(error => console.log(error))
