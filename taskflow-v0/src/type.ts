export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Task = { id: string; title: string; status: Status; priority: Priority };
export type Filter = "all" | Status;
export type Project = { id: string; name: string; description: string };
// export const MAX_TITLE = 80;

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To Do",
  doing: "Doing",
  done: "Done"
};

export const nextStatus = (s: Status): Status => 
    s === "todo" ? "doing" : s === "doing" ? "done" : "todo";

// Données pour créer : sans id (généré par le serveur)
export type NewProject = Omit<Project, "id">;
export type NewTask = Omit<Task, "id">;
// Projet avec ses tâches (réponse de /projects?_embed=tasks)
export type ProjectWithTasks = Project & { tasks: Task[] };