
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProject, getProjectTasks } from "../api";
import type { Project, ProjectTask } from "../type";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Identifiant du projet manquant");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProject() {
      setLoading(true);
      setError(null);

      try {
        const [projectData, tasksData] = await Promise.all([
          getProject(id!),
          getProjectTasks(id!),
        ]);

        if (!cancelled) {
          setProject(projectData);
          setTasks(tasksData);
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger le projet");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Chargement du projet...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!project) {
    return <p>Projet introuvable.</p>;
  }

  return (
    <section>
      <Link to="/">← Retour aux projets</Link>

      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <h2>Tâches du projet</h2>

      {tasks.length === 0 ? (
        <p>Aucune tâche pour ce projet.</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <article className="card" key={task.id}>
              <h3>{task.title}</h3>
              <p>Statut : {task.status}</p>
              <p>Priorité : {task.priority}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
