# Iffco-AonlaVT

A small full-stack application consisting of a Vite + React client and an Express server. This repository contains two main folders: `client/` (front-end) and `server/` (back-end).

## What this repo contains

- `client/` — React app (Vite) with pages for Home, About, Gallery, Contact, Login, Register and simple admin pages.
- `server/` — Express server implementing authentication, contact management and admin routes.
- `models/`, `controllers/`, `middlewares/`, and `validators/` used by the server.

## Quick start (development)

Requirements:
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or Atlas) if the server uses a database

1. Install and run the client

```bash
# from repo root (zsh)
cd client
npm install
npm run dev
```

The client uses Vite and will run on a dev server (typically http://localhost:5173).

2. Install and run the server

```bash
# open a new terminal tab/window
cd server
npm install
# If package.json defines a start script, use:
npm start
# or run directly:
node server.js
```

The server normally listens on a port defined by environment variables (see next section).

## Environment variables

The server likely requires environment variables. Common ones to set in a `.env` file at `server/.env` or in your environment:

- `PORT` — port the server listens on (default 3000)
- `MONGO_URI` or `MONGODB_URI` — connection string for MongoDB
- `JWT_SECRET` — secret for signing JWT tokens

Note: I inferred these variable names from typical Express + MongoDB setups. Check `server/server.js` and the `utils/` or `config` files to confirm exact names.

## Project structure (high level)

client/
- `src/` — React source with pages and components
- `package.json` — client scripts (dev, build, etc.)

server/
- `server.js` — entry point
- `controller/` — route handlers
- `models/` — Mongoose models
- `middlewares/` — Express middlewares
- `router/` — route definitions
- `utils/` — helper utilities
- `validators/` — request validators

## Building for production

1. Build the client

```bash
cd client
npm run build
```

2. Serve the built client from a static server, or integrate into the Express server by copying `client/dist` into a public folder and configuring the server to serve static assets.

## Notes & assumptions

- I assumed the server uses MongoDB and JWT for auth; adjust the `.env` names to match the code.
- If `npm start` is not defined for the server, run `node server.js` as shown above.

## Troubleshooting

- If the client dev server port conflicts, change Vite port in `client/package.json` or `vite.config.js`.
- If the server cannot connect to MongoDB, verify `MONGO_URI` and check network access (Atlas IP whitelist).

## Useful commands

```bash
# start client dev server (zsh)
cd client && npm install && npm run dev

# start server
cd server && npm install && npm start  # or node server.js

# build client for production
cd client && npm run build
```


