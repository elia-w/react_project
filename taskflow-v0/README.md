# TaskFlow — TP2 : TaskFlow v1

Module React + Next.js · M2 ESIEE-IT · branche `tp2`

Suite du TP1 : la liste de tâches utilise les hooks essentiels. Les tâches sont gardées dans le navigateur (`localStorage`) grâce à un hook personnalisé, et le titre de l'onglet affiche le nombre de tâches restantes.

## En ligne

https://react-project-tp2.vercel.app

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
- **Compteur** de tâches restantes, aussi affiché dans le titre de l'onglet (`useEffect`).
- **Sauvegarde automatique** : les tâches restent après un rechargement de la page (`useLocalStorage`).

## Hooks utilisés

- `useState` : liste des tâches, filtre, champ du formulaire.
- `useEffect` : synchronisation du titre de l'onglet et du `localStorage`.
- `useLocalStorage` (hook personnalisé, `src/hook/useLocalStorage.ts`) : un `useState` sauvegardé dans le navigateur.
- `useRef` et `useMemo` : exercice « quel hook choisir » dans `src/components/TaskEditor.tsx`.

## Structure

```
src/
  App.tsx                  état des tâches et du filtre
  type.ts                  types Task, Status, Filter…
  hook/useLocalStorage.ts  hook personnalisé
  components/              TaskForm, TaskList, TaskItem, FilterBar, Card, TaskEditor
```

## Stack

React 19, TypeScript, Vite. Déployé sur Vercel.

## Réalisation

Projet réalisé seule par Elia Wu.
