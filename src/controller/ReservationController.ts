import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Reservation } from '../entity/Reservation';
import { validate } from "class-validator";

export class ReservationController {

    static getAll = async (req: Request, res: Response) => {
        const reservationRepository = getRepository(Reservation);
        let reservations;
        try {
            reservations = await reservationRepository.find();
        } catch (error) {
            res.status(404).json({ message: 'Not result' });
        }

        if (reservations.length > 0) {
            res.send(reservations);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    }

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const reservationRepository = getRepository(Reservation);
        try{
            const reservation = await reservationRepository.findOneOrFail(id);
            res.send(reservation);
        } catch (error) {
            res.status(404).json({ message: 'Not result' });
        }
    }

    static newReservation = async (req: Request, res: Response) => {
        const {userId, tripId} = req.body;
        const reservation = new Reservation();

        reservation.id_user = userId;
        reservation.id_trip = tripId;

        const errors = await validate(reservation);
        if(errors.length > 0) {
            return res.status(400).json(errors);
        }

        const reservationRepository = getRepository(Reservation);
        try {
            await reservationRepository.save(reservation);
        } catch (error) {
            return res.status(409).json(errors);
        }

        res.send('Ok');
    };

    static editReservation = async (req: Request, res:Response )=> {
        let reservation;
        const {id} = req.params;
        const {userId, tripId} = req.body;

        const reservationRepository = getRepository(Reservation);

        try {
            reservation = await reservationRepository.findOneOrFail(id);
            reservation.id_user = userId;
            reservation.id_trip = tripId;
        } catch (error) {
            return res.status(404).json({message: 'Reservation not found'});
        }

        const errors = await validate(reservation);

        if(errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await reservationRepository.save(reservation);
        } catch (error) {
            return res.status(400).json(errors);
        }

        res.status(201).json({message: 'Reservation update'});
    }

    static deleteReservation = async ( req:Request, res:Response ) => {
        const {id} = req.params;
        const reservationRepository = getRepository(Reservation);
        let reservation:Reservation;

        try {
            reservation = await reservationRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message: 'Reservation not found'});
        }

        reservationRepository.delete(id);
        res.status(201).json({message: 'Reservation deleted'});
    };

}

export default ReservationController;