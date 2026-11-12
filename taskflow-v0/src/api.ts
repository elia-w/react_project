
import type { Project, ProjectTask, ProjectWithTasks, NewTask } from "./type";

// En ligne : adresse de l'API Render, donnée par Vercel (VITE_API_URL)
// En local : json-server sur le port 3001
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Récupérer tous les projets
export async function getProjects(): Promise<ProjectWithTasks[]> {
  const response = await fetch(
    `${API_URL}/projects?_embed=tasks`
  );

  if (!response.ok) {
    throw new Error("Impossible de charger les projets.");
  }

  return response.json();
}

// Récupérer un projet par son ID
export async function getProject(id: string): Promise<Project> {
  const response = await fetch(
    `${API_URL}/projects/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new ApiError(response.status, "Projet introuvable");
  }

  return response.json();
}

// Récupérer les tâches d'un projet
export async function getProjectTasks(
  projectId: string
): Promise<ProjectTask[]> {
  const response = await fetch(
    `${API_URL}/tasks?projectId=${encodeURIComponent(projectId)}`
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les tâches");
  }

  return response.json();
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function createTask(
  task: NewTask
): Promise<ProjectTask> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Création impossible");
  }

  return response.json();
}

export async function updateTask(
  id: string,
  changes: Partial<ProjectTask>
): Promise<ProjectTask> {
  const response = await fetch(
    `${API_URL}/tasks/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    }
  );

  if (!response.ok) {
    throw new ApiError(response.status, "Modification impossible");
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/tasks/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new ApiError(response.status, "Suppression impossible");
  }
}

export async function createProject(
  data: Pick<Project, "name" | "description">
): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Impossible de créer le projet"
    );
  }

  return response.json();
}
