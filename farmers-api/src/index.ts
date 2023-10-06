import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env['NODE_DOCKER_PORT'] ?? 8080;

app.listen(PORT, async () => console.log(`Server is running on port ${PORT}.`));

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Farmers API' }));
