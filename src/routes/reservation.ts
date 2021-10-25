import { Router } from 'express';
import { ReservationController } from '../controller/ReservationController';
import { checkJwt } from '../middlewares/jws';
import { checkRole } from '../middlewares/role';

const router = Router();

router.get('/', [checkJwt, checkRole(0)], ReservationController.getAll);

router.get('/:id', [checkJwt, checkRole(0)], ReservationController.getById);

router.post('/', [checkJwt], ReservationController.newReservation);

router.patch('/:id', [checkJwt, checkRole(0)], ReservationController.editReservation);

router.delete('/:id',[checkJwt], ReservationController.deleteReservation);

export default router;
