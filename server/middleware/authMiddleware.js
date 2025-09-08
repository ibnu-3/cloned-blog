import jwt from 'jsonwebtoken'
import User from '../models/User';
export const protect =async (req,res, next) => {
    let token;
    if(req.header.authorization?.startsWith('Bearer')){
        try {
            token= req.header.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'jwt')
           req.user= await User.findById(decoded.id).select('-password')
           next() 
        } catch (error) {
            res.status(403).json({message:"Not Authorized, token failed", error:error.message})
            console.log(error.message)
        }
    }else{
       res.status(403).json({message:"Not Authorized, no token "})
    }
}

export const admin =async (req, res, next) => {
    if(req.user && req.user.role== 'admin'){
        next()
    }else{
        res.status(403).json({message:"Not Authorized as admin"})
    }
}