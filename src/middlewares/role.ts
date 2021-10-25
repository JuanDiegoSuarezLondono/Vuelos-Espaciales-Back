import { Request,Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const checkRole = (roles:number) => {
    return async (req:Request, res:Response, next: NextFunction) => {
        const {userId} = res.locals.jwtPayload;
        const userRepository = getRepository (User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(userId);
        } catch (error) {
            return res.sendStatus(401).send();            
        }

        const {role} = user;

        if(roles == role) {
            next();
        } else {
            return res.sendStatus(401).send(); 
        }
    }    
}