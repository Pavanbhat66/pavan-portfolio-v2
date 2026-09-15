# Pavan Portfolio

A responsive React + Express portfolio application. The portfolio content is served by the Express API, and the contact form submits to it.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite (normally `http://localhost:5173`). The API runs on port `4000`.

## Deploy to Vercel

Push this folder to a GitHub repository, then import that repository at [Vercel](https://vercel.com/new). Vercel detects Vite automatically. Keep the defaults and click **Deploy**. The `api/` folder contains the Vercel serverless endpoints used by the site.

## Deploy to Render

Push this folder to a GitHub repository, then create a **Web Service** on Render with these values:

- Runtime: `Node`
- Build command: `npm install && npm run build`
- Start command: `npm start`

Render will provide the `PORT` automatically. The Express server serves the compiled React site and API together.

## Personalize

Edit the `portfolio` object in `server/index.js` to replace the starter bio, skills, statistics, and projects with the exact resume details. The supplied portrait is in `public/pavan.png`.
