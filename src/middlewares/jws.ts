import { resolveTxt } from 'dns';
import {Request, response, NextFunction, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res:Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send();        
    }

    const {userId, username} = jwtPayload;

    const newToken = jwt.sign({userId, username}, config.jwtSecret, {expiresIn: '5m'});
    res.setHeader('token', newToken);
    next();
}