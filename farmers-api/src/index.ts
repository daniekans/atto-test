import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Farmers API' }));

app.listen(8080, async () => console.log('Server is running at http://localhost:8080'));
