import { Router } from 'express';
import { TripController } from '../controller/TripController';
import { checkJwt } from '../middlewares/jws';
import { checkRole } from '../middlewares/role';

const router = Router();

router.get('/', [checkJwt], TripController.getAll);

router.get('/:id', [checkJwt], TripController.getById);

router.post('/', [checkJwt, checkRole(0)], TripController.newTrip);

router.patch('/:id', [checkJwt, checkRole(0)], TripController.editTrip);

router.delete('/:id',[checkJwt, checkRole(0)], TripController.deleteTrip);

export default router;
