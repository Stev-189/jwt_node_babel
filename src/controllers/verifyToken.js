import * as jwt from 'jsonwebtoken';
import * as config from '../config';


export default function verifyToken (req, res, next){
    const token = req.headers['x-access-token']
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        })
    }
    const decoded= jwt.verify(token, config.secret);
    req.userId= decoded.id;
    next();
}