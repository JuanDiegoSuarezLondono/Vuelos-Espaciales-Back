import {Router} from 'express'

import auth from './auth';
import user from './user';
import trip from './trip';
import reservations from './reservation';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/trips', trip);
routes.use('/reservations', reservations);

export default routes;
