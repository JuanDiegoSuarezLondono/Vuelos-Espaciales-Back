import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Trip} from "../entity/Trip";
import { validate } from "class-validator";

export class TripController {

    static getAll = async (req: Request, res: Response) => {
        const tripRepository = getRepository(Trip);
        let trips;
        try {
            trips = await tripRepository.find();
        } catch (error) {
            res.status(404).json({ message: 'Not result' });
        }

        if (trips.length > 0) {
            res.send(trips);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    }

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(Trip);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'Not result' });
        }
    }

    static newTrip = async (req: Request, res: Response) => {
        const {goTo, arriveTime, outTime, passengers} = req.body;
        const trip = new Trip();

        trip.go_to = goTo;
        trip.arrive_time = arriveTime;
        trip.out_time = outTime;
        trip.passengers = passengers;

        const errors = await validate(trip);
        if(errors.length > 0) {
            return res.status(400).json(errors);
        }

        const tripRepository = getRepository(Trip);
        try {
            await tripRepository.save(trip);
        } catch (error) {
            return res.status(409).json(errors);
        }

        res.send('Ok');
    };

    static editTrip = async (req: Request, res:Response )=> {
        let trip;
        const {id} = req.params;
        const {goTo, arriveTime, outTime, passengers} = req.body;

        const tripRepository = getRepository(Trip);

        try {
            trip = await tripRepository.findOneOrFail(id);
            trip.go_to = goTo;
            trip.arrive_time = arriveTime;
            trip.out_time = outTime;
            trip.passengers = passengers;
        } catch (error) {
            return res.status(404).json({message: 'Trip not found'});
        }

        const errors = await validate(trip);

        if(errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await tripRepository.save(trip);
        } catch (error) {
            return res.status(400).json(errors);
        }

        res.status(201).json({message: 'Trip update'});
    }

    static deleteTrip = async ( req:Request, res:Response ) => {
        const {id} = req.params;
        const tripRepository = getRepository(Trip);
        let trip:Trip;

        try {
            trip = await tripRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message: 'Trip not found'});
        }

        tripRepository.delete(id);
        res.status(201).json({message: 'Trip deleted'});
    };

}

export default TripController;