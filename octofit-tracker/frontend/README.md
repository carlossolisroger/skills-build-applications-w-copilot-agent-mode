# OctoFit Tracker frontend

The presentation tier is a React 19 application built with Vite. Its screens
load activities, leaderboard entries, teams, users, and workouts from the
backend API.

## API configuration

When running in GitHub Codespaces, the API hostname needs the Codespace name.
The frontend reads the standard `CODESPACE_NAME` from Vite's environment when
available. You can explicitly set or override it in
`octofit-tracker/frontend/.env.local` with `VITE_CODESPACE_NAME`, for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads the value at startup and sends API requests to
`https://<codespace-name>-8000.app.github.dev`. Restart the Vite dev server
after changing `.env.local`. The frontend accesses it through
`import.meta.env.VITE_CODESPACE_NAME`.

If neither variable is set, the frontend uses `http://localhost:8000`, which
is suitable when the API is running locally.
The API requests use `/api/activities/`, `/api/leaderboard/`, `/api/teams/`,
`/api/users/`, and `/api/workouts/`.

Start the development server from the frontend directory with `npm run dev`.
