# Website-Monitor

An uptime monitor for a list of sites you care about. The backend polls every URL on a fixed
interval, records whether it answered, and the React dashboard shows the current state of each one.

## How it works

The monitoring loop lives in [`back/src/utils/isAlive.ts`](back/src/utils/isAlive.ts) and starts
with the server:

```
startMonitoring()
   │
   ├─ initial sweep on boot
   └─ setInterval, every 5 minutes
         │
         └─ for every site in MongoDB (in parallel):
              GET url  (30s timeout)
                 │
                 ├─ 2xx / 3xx  → alive
                 └─ 4xx / 5xx / timeout / DNS failure → down
                       │
                       └─ write to DB **only when the status changed**
```

Two details worth calling out:

- **Checks run in parallel** (`Promise.all`), so one slow site doesn't delay the rest of the sweep.
- **Writes happen only on transition.** A site that stays up for a week produces zero database
  writes — the `isAlive` field is touched only when a site flips between up and down.

## Structure

```
back/     Express + TypeScript API and the polling engine
  src/routes        REST routes
  src/controllers   request handling
  src/services      MongoDB access
  src/models        Mongoose schema (url, name, isAlive)
  src/utils/isAlive.ts   the monitoring loop
  src/middleware    async wrapper + central error handler

ui/       React + Vite + Tailwind dashboard
  src/pages/Dashboard.tsx     status overview
  src/pages/AllWebsites.tsx   full list, add and remove
  src/hooks                   data fetching
```

## Stack

**Backend** — Node.js, Express, TypeScript, MongoDB (Mongoose), axios, Docker
**Frontend** — React, Vite, TypeScript, Tailwind CSS, React Router, react-hot-toast

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/websites` | List all monitored sites with their current status |
| `POST` | `/websites` | Add a site (`{ name, url }`) |
| `PUT` | `/websites/:id` | Update a site |
| `DELETE` | `/websites/:id` | Stop monitoring a site |
| `GET` | `/isAlive` | Health check for the monitor itself |

## Running it

**Backend**

```bash
cd back
npm install
cp .env.example .env      # then fill in the values below
npm run dev
```

`.env`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/website-monitor
```

**Frontend**

```bash
cd ui
npm install
npm run dev               # http://localhost:5173
```

**Docker** — a `Dockerfile` for the backend lives in [`back/`](back/).

## Current limits

Worth knowing before you rely on it:

- **The interval is fixed at 5 minutes** and hardcoded in `isAlive.ts`. It isn't configurable
  per site yet.
- **No history is kept.** Only the current `isAlive` value is stored, so there is no uptime
  percentage, no incident timeline and no "down since" timestamp.
- **Alerting is a stub.** Sites that fail a check are logged to the console; the hook where an
  email or webhook would go is marked in `checkAllServers` but not implemented.
- **Liveness is HTTP status only.** A site returning `200` with a broken page counts as alive —
  there is no content assertion or response-time threshold.
