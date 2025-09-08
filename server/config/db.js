import mongoose from "mongoose"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('<<<<<<< MongoDB Connected >>>>>>>'.cyan.bold.underline)
    } catch (error) {
        console.log('MongoDB error'.red.bold,error)
    }
}

export default connectDB