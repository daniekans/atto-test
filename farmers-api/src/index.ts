import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import db from '../models/index';
import { configFarmerRoutes } from '../routes/farmer.routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize
  .sync()
  .then(() => console.log('Synced database.'))
  .catch(err => console.log(`Failed to sync database: ${err.message}`));

configFarmerRoutes(app);

const PORT = process.env['NODE_DOCKER_PORT'] ?? 8080;

app.listen(PORT, async () => console.log(`Server is running on port ${PORT}.`));

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Farmers API' }));
