# TaskFlow — TP1 : TaskFlow v0

Module React + Next.js · M2 ESIEE-IT · branche `tp1`

Première version de TaskFlow : l'interface d'une liste de tâches en React + TypeScript, sans serveur. Les tâches sont gardées en mémoire (elles disparaissent au rechargement de la page).

## En ligne

https://react-project-tp1.vercel.app

## Installation et lancement

```bash
cd taskflow-v0
npm install
npm run dev      # http://localhost:5173
```

Autres commandes : `npm run build` (build de production), `npm run lint`.

## Fonctionnalités

- **Ajouter une tâche** : formulaire contrôlé, titre obligatoire et limité à 80 caractères.
- **Changer le statut** d'une tâche d'un clic : À faire → En cours → Terminée.
- **Supprimer** une tâche.
- **Filtrer** les tâches : Toutes / À faire / En cours / Terminées.
- **Compteur** de tâches restantes dans le titre.

## Notions abordées

- Composants et props typés avec TypeScript.
- État avec `useState`, mises à jour immuables (`map`, `filter`, décomposition).
- États dérivés (tâches visibles, nombre de tâches restantes) calculés pendant le rendu.
- Listes avec `key`, événements, formulaire contrôlé.

## Structure

```
src/
  App.tsx          état des tâches et du filtre
  type.ts          types Task, Status…
  components/      Card, TaskForm, TaskList, TaskItem, FilterBar
```

## Stack

React 19, TypeScript, Vite. Déployé sur Vercel.

## Réalisation

Projet réalisé seule par Elia Wu.
