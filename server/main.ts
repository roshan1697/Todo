import express from 'express';
import{ mongoURL} from './config'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './routes/userroute'
import todoRoute from './routes/todoroute'

const app = express()
app.use(express.json())


app.use(cors({
    origin:'http://localhost:5173'
  }))
  
  
  app.use("/user", userRoute)
  app.use("/todo", todoRoute)

  mongoose.connect(mongoURL).then(()=>
{
    console.log('db connected')
    app.listen(3000,()=>{
        console.log('connected')
    })
})
    .catch((err)=>{
        console.log(err)
    })