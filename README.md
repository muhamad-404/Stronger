# Stronger

Eat, Train, Recover, Grow.

A calm, mobile-first Progressive Web App for healthy weight gain — food consistency, gentle strength, sleep, and progress. All personal data stays on the device (IndexedDB). Nothing is uploaded to a server.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The app is built for project sites at:

`https://USERNAME.github.io/REPOSITORY/`

It uses:

- Vite `base: './'` so asset URLs work under a repository subpath
- **HashRouter** (`/#/…`) so refreshing a route does not cause a GitHub Pages 404

### 1. Push the repository

Create a GitHub repo and push this project (source only — never commit personal backups or exported JSON).

### 2. Enable GitHub Pages (required before first deploy)

The workflow **build** can succeed while **deploy** fails with `404` / `Failed to create deployment` if Pages is not enabled yet.

1. Open **https://github.com/muhamad-404/Stronger/settings/pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”)
3. Save if prompted

Also confirm Actions can write:

1. **Settings** → **Actions** → **General**
2. **Workflow permissions** → **Read and write permissions**
3. Ensure **Allow GitHub Actions to create and approve pull requests** is optional; Pages only needs `pages: write` + `id-token: write` (already in the workflow)

Then re-run the failed workflow: **Actions** → **Deploy to GitHub Pages** → failed run → **Re-run failed jobs** (or push again).

### 3. Allow the workflow to run

Push to `main` (or `master`), or run **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Checks out the repo  
2. Installs Node dependencies (`npm ci`)  
3. Builds with Vite (`npm run build`)  
4. Uploads the `dist` artifact  
5. Deploys to GitHub Pages  

### 4. Open the live app

After the workflow succeeds, the site is at:

`https://muhamad-404.github.io/Stronger/`

Routes look like:

`https://muhamad-404.github.io/Stronger/#/eat`

### If deploy still fails with 404

- Pages Source must be **GitHub Actions**, not branch `gh-pages` / `docs`
- Repo must not be empty / deleted; you need admin access to enable Pages
- Private org repos sometimes need Pages enabled at the org level

Node.js deprecation annotations about Actions on Node 20 are warnings; the workflow uses Node **24** for the app build.
## PWA / offline

After an online visit, Stronger can load offline via the service worker. Progress remains in IndexedDB on that device. Use **Settings → Data & backup** to export a JSON backup — keep backups off GitHub.

## What not to commit

Do **not** commit:

- Personal health/progress exports (`stronger-backup*.json`, `*.stronger.json`)
- `.env` files with secrets
- Local `dist/` build output (CI builds it)

These patterns are already covered in `.gitignore`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run icons` | Regenerate PWA PNG icons from the SVG |
