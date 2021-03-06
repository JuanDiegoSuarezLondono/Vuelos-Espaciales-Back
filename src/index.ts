import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
const cors = require('cors');
import * as helmet from 'helmet';
const PORT =process.env.port || 3000;
import routes from './routes';

createConnection().then(async () => {

    const app = express();

    app.use(cors());

    app.use(helmet());

    app.use(express.json());

    app.use('/',routes);

    app.listen(PORT, () => console.log('Serve runing on port: '+PORT));

}).catch(error => console.log(error));
