# OctoFit Tracker frontend

The presentation tier is a React 19 application built with Vite. Its screens
load activities, leaderboard entries, teams, users, and workouts from the
backend API.

## API configuration

When running in GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined in
`octofit-tracker/frontend/.env.local` with the Codespace name (the value of
`CODESPACE_NAME`), for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value at startup and sends API requests to
`https://<codespace-name>-8000.app.github.dev`. Restart the Vite dev server
after changing `.env.local`.

If `VITE_CODESPACE_NAME` is unset, the frontend safely uses
`http://localhost:8000`, which is suitable when the API is running locally.
The API requests use `/api/activities/`, `/api/leaderboard/`, `/api/teams/`,
`/api/users/`, and `/api/workouts/`.

Start the development server from the frontend directory with `npm run dev`.
