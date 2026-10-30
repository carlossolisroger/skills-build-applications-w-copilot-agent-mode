import cors from 'cors';
import express from 'express';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { connectDatabase } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(
    await Activity.find()
      .sort({ date: -1 })
      .populate('user', 'name')
      .lean(),
  );
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .sort({ points: -1 })
      .populate('user', 'name')
      .populate('team', 'name')
      .lean(),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

export async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

const isMainModule =
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMainModule) {
  startServer().catch((error: unknown) => {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  });
}

export { app };
