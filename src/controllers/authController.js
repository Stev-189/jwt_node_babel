import { Router } from 'express';
const router= Router();

import User from '../models/User'
import * as jwt from 'jsonwebtoken'
import * as config from '../config'
import verifyToken from './verifyToken'

router.get('/', (req,res,next)=>{
    const obj ={ username: "username", email: "email", password: "password" }
    res.json(obj)
});

router.post('/singup', async (req,res,next)=>{
    const { username, email, password}= req.body;
    const user = new User({
        username, 
        email, 
        password
    });
    user.password= await user.encryptPassword(user.password);
    await user.save();
    const token= jwt.sign({id: user._id},config.secret, {
        expiresIn : 60*60*24
    })
    res.json({auth: true, token})
});

router.get('/me', verifyToken,async (req,res,next)=>{
    // const token = req.headers['x-access-token']
    // if (!token){
    //     return res.status(401).json({
    //         auth: false,
    //         message: 'no token provided'
    //     })
    // }
    // const decoded= jwt.verify(token, config.secret);//esto genera un objeto
    // console.log(decoded);
    // const user = await User.findById(decoded.id, {password:0});//lo ultimo es para mongosse no devela la pass
    const user = await User.findById(req.userId, {password:0});//lo ultimo es para mongosse no devela la pass
    if(!user){
        return res.status(404).send('No user found')
    }
    res.json(user)
});

router.post('/singin', async (req,res,next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    if (!user){
        return res.status(404).send("the email doesn`t exists")
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).json({auth: false, token: null});
    }
    const token= jwt.sign({id: user._id},config.secret, {
        expiresIn : 60*60*24
    })
    // console.log(validPassword);
    res.json({auth: true, token})
});


export default router;