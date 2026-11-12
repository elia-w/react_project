# TaskFlow — TP3 : TaskFlow multi-pages

Module React + Next.js · M2 ESIEE-IT · branche `tp3`

TaskFlow devient une application multi-pages : plusieurs projets, chacun avec ses tâches, stockés dans une API REST (json-server). Navigation avec React Router, formulaires, appels réseau avec gestion du chargement et des erreurs, thème clair/sombre.

## En ligne

- Site (Vercel) : https://react-project-tp3.vercel.app
- API (Render) : https://react-project-owvg.onrender.com

L'API est sur l'offre gratuite de Render : le premier chargement peut prendre jusqu'à une minute si elle est en veille.

## Installation et lancement

```bash
cd taskflow-v0
npm install
npm run dev      # site http://localhost:5173 + API http://localhost:3001
```

`npm run dev` lance en même temps le site (Vite) et l'API (json-server sur `db.json`).

Autres commandes : `npm run build` (build de production), `npm run web` (site seul), `npm run api` (API seule).

## Fonctionnalités

- **Liste des projets** (`/`) : chargée depuis l'API, avec le nombre de tâches terminées par projet.
- **Nouveau projet** (`/projects/new`) : formulaire avec validation (nom d'au moins 3 caractères, description de 200 caractères maximum), puis redirection vers le projet créé.
- **Page d'un projet** (`/projects/:id`) : ajouter une tâche, faire tourner son statut (À faire → En cours → Terminée), la supprimer, filtrer par statut. Chaque action est enregistrée dans l'API.
- **Chargement et erreurs** : message pendant le chargement, message d'erreur si l'API ne répond pas.
- **Page À propos** (`/about`) et **page 404** pour une adresse ou un projet inconnus.
- **Thème clair / sombre** partagé par toute l'application (Context).

## Mise en ligne

- **API sur Render** : dossier `taskflow-v0`, Build Command `npm install`, Start Command `npm start` (json-server sur le port fourni par Render).
- **Site sur Vercel** : dossier `taskflow-v0`, preset Vite, variable d'environnement `VITE_API_URL` = adresse de l'API Render. Sans cette variable, le site utilise `http://localhost:3001`.
- `vercel.json` renvoie toutes les adresses vers `index.html`, pour que React Router fonctionne quand on recharge une page.

## Structure

```
src/
  api.ts                 appels à l'API (fetch)
  App.tsx                routes (React Router)
  pages/                 ProjectsPage, ProjectPage, NewProjectPage, NotFoundPage
  components/            Layout, Card, TaskForm, TaskList, TaskItem, FilterBar, ThemeToggle…
  context/ThemeContext.tsx  thème clair/sombre
  hooks/useLocalStorage.ts
db.json                  données de l'API (projets et tâches)
vercel.json              réécriture des routes pour Vercel
```

## Stack

React 19, TypeScript, Vite, React Router 8, json-server. Site sur Vercel, API sur Render.

## Réalisation

Projet réalisé seule par Elia Wu.
