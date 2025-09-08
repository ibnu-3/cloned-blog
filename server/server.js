import colors from 'colors'
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
// import postRoutes from './routes/postRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({
    origin:"https://fantastic-engine-5gp9gpq5ppv92p6pv-5173.app.github.dev",
    methods:['POST','GET','DELETE','PUT','OPTIONS','HEAD'],
    allowedHeaders:['Content-Type','Authorization', 'X-Custom-Head'],
    credentials: true,

}))
app.use(express.json())

connectDB()
app.get('/', (req,res)=>{
    res.send('Hello mern dev')
})
app.use('/api/auth', authRoutes)
// app.use('/api/posts', postRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`.yellow.bold)
})