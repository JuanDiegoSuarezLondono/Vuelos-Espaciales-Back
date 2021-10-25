import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from '../entity/User';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';


class AuthController {
    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        if( !(username && password) ){
            return res.status(400).json ({message: 'Username & Password are required'});
        }

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail({ where: {user: username}});
        } catch (e) {
            return res.status(400).json ({message: 'Username or Password incorect'});
        }

        if(!user.checkPassword(password)) {
            return res.status(400).json ({message: 'Username or Password incorect'});
        }

        const token = jwt.sign ({userId: user.id_user, username: user.user}, config.jwtSecret, {expiresIn: '5m'})

        res.json({message: 'OK', token, userId: user.id_user, role: user.role});
    };

}

export default AuthController;