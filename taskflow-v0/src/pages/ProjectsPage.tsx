import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProjects } from "../api";
import type { ProjectWithTasks } from "../type";

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getProjects()
      .then((data) => {
        if (!ignore) setProjects(data);
      })
      .catch(() => {
        if (!ignore) {
          setError("Impossible de charger les projets.");
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p>Chargement des projets...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <div className="page-header">
        <h1>Projets</h1>

        <Link to="/projects/new">
          + Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>Aucun projet disponible.</p>
      ) : (
        <ul className="project-grid">
          {projects.map((p) => {
            const done = p.tasks.filter(
              (t) => t.status === "done"
            ).length;

            return (
              <li key={p.id}>
                <Link
                  to={`/projects/${p.id}`}
                  className="project-card"
                >
                  <h2>{p.name}</h2>

                  <p className="muted">
                    {p.description}
                  </p>

                  <p className="small">
                    {done} / {p.tasks.length} tâche(s) terminée(s)
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
