import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jws';
import { checkRole } from '../middlewares/role';

const router = Router();

router.get('/', [checkJwt, checkRole(0)], UserController.getAll);

router.get('/:id', [checkJwt], UserController.getById);

router.post('/', [checkJwt, checkRole(0)], UserController.newUser);

router.patch('/:id', [checkJwt, checkRole(0)], UserController.editUser);

router.delete('/:id',[checkJwt, checkRole(0)], UserController.deleteUser);

export default router;
