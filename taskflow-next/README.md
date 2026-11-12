# TaskFlow — TP4 : TaskFlow en Next.js

Module React + Next.js · M2 ESIEE-IT · branche `tp-demo`

La partie « lecture » du TP3 refaite avec Next.js (App Router) : liste des projets, page d'un projet avec ses tâches filtrables, écran de chargement et page 404. Les données sont lues sur le serveur depuis `db.json` : ni React Router, ni json-server, ni `useEffect`.

## En ligne

https://react-project-demo-nu.vercel.app

## Installation et lancement

```bash
cd taskflow-next
npm install
npm run dev      # http://localhost:3000
```

Autres commandes : `npm run build` (build de production), `npm run lint`.

## Fonctionnalités

- **Layout commun** (`src/app/layout.tsx`) : barre du haut avec les liens « Projets » et « À propos ».
- **Page À propos** (`/about`) : une route créée par un simple dossier, avec son propre titre d'onglet.
- **Liste des projets** (`/`) : Server Component `async` qui lit les projets sur le serveur et affiche le nombre de tâches terminées.
- **Page d'un projet** (`/projects/[id]`) : adresse variable, `notFound()` si le projet n'existe pas.
- **Filtres des tâches** (`TaskBoard`) : composant client (`"use client"` + `useState`) pour filtrer Toutes / À faire / En cours / Terminées sans recharger la page.
- **Chargement et 404** : `loading.tsx` s'affiche pendant la lecture des données, `not-found.tsx` pour une adresse ou un projet inconnus.

## Structure

```
src/
  app/
    layout.tsx            mise en page commune
    page.tsx              liste des projets (/)
    about/page.tsx        page À propos (/about)
    projects/[id]/page.tsx  page d'un projet
    loading.tsx           écran de chargement
    not-found.tsx         page 404
  components/TaskBoard.tsx  filtres (composant client)
  lib/
    types.ts              types Task, Project…
    data.ts               lecture de db.json (serveur uniquement)
db.json                   données (projets et tâches)
```

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript. Déployé sur Vercel.

## Réalisation

Projet réalisé seule par Elia Wu.
