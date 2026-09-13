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

### 2. Enable GitHub Pages (Actions)

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**

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

`https://USERNAME.github.io/REPOSITORY/`

Routes look like:

`https://USERNAME.github.io/REPOSITORY/#/eat`

### First-time Actions permissions

If deploy fails with a permissions error:

1. **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions** (or ensure Pages write is allowed)
3. Re-run the workflow

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
