// Les mêmes types qu'au TP3, pour les données de db.json
export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;

export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: Status;
  priority: Priority;
};

export type Project = { id: string; name: string; description: string };

// Projet avec ses tâches
export type ProjectWithTasks = Project & { tasks: Task[] };

export const STATUS_LABEL: Record<Status, string> = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminée",
};
