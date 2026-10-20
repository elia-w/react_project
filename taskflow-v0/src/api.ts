
import type { Project, ProjectTask, ProjectWithTasks } from "./type";

const API_URL = "http://localhost:3001";

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
    throw new Error("Projet introuvable");
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
