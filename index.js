import express from 'express'
import path from 'path'
// console.log(path.resolve('./config/config.env'))
import { config } from 'dotenv'
config({ path: path.resolve('./config/config.env') })

const app = express()
const port = process.env.PORT

import { connectionDB } from './DB/connection.js'
import * as allRouters from './src/modules/index.routes.js'
import { userModel } from './DB/Models/user.model.js'

app.use(express.json())
connectionDB()

// app.use('/user', allRouters.userRouter)
// app.use('/msg', allRouters.messageRouter)



//==================================== Save =======================
app.post('/user/save', async function (req, res) {
    const newUser = new userModel({
        username: "amira ezaat",
        email: `amira${Math.random()}@gmail.com`,
        password: "Amira112233",
    })
    const user = await newUser.save()
    res.json({ message: "some", user })
})

app.get('/user/all', async function (req, res) {
    const user = await userModel.find({})
    const cpunt = await userModel.count({})
    res.json({ message: "some", user, cpunt })
})
//========================== Delete One ========================
app.post('/user/deleteOne', async function (req, res) {
    // ===================== to deleteOne using doc midleware(constructor method)
    // const newUser = new userModel({ _id: req.query.id })
    // const user = await newUser.deleteOne() // in hooks must activate the doc option for deleteOne because it query midleware by default

    // ===================== to deleteOne using query midleware( query method)
    // const user = await userModel.deleteOne({ _id: req.query.id })
    const user = await userModel.findOneAndDelete({ _id: req.query.id })
    res.json({ message: "some", user })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
