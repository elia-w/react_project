import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Card } from "../components/Card";
import { NotFoundPage } from "./NotFoundPage";
import * as api from "../api";
import { nextStatus } from "../type";

import type {
  Project,
  ProjectTask,
  Filter,
  Priority,
} from "../type";

import { FilterBar } from "../components/FilterBar";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let ignore = false;

    setLoading(true);
    setNotFound(false);
    setError(null);
    setProject(null);
    setTasks([]);

    Promise.all([
      api.getProject(id),
      api.getProjectTasks(id),
    ])
      .then(([p, t]) => {
        if (ignore) return;
        setProject(p);
        setTasks(t);
      })
      .catch((e: unknown) => {
        if (ignore) return;

        if (e instanceof api.ApiError && e.status === 404) {
          setNotFound(true);
        } else {
          setError("Impossible de charger le projet.");
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  async function add(title: string, priority: Priority = 2) {
    if (!id) return;

    try {
      const created = await api.createTask({
        projectId: id,
        title,
        status: "todo",
        priority,
      });

      setTasks((prev) => [...prev, created]);
    } catch {
      setError("La tâche n'a pas pu être ajoutée.");
    }
  }

  async function remove(taskId: string) {
    try {
      await api.deleteTask(taskId);

      setTasks((prev) =>
        prev.filter((t) => t.id !== taskId)
      );
    } catch {
      setError("La tâche n'a pas pu être supprimée.");
    }
  }

  async function cycle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const updated = await api.updateTask(taskId, {
        status: nextStatus(task.status),
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? updated : t
        )
      );
    } catch {
      setError("La tâche n'a pas pu être modifiée.");
    }
  }

  if (loading) return <p>Chargement...</p>;

  if (notFound) return <NotFoundPage />;

  if (!project) {
    return (
      <p role="alert">
        {error ?? "Projet indisponible."}
      </p>
    );
  }

  const visible =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <section>
      <Link to="/">← Tous les projets</Link>

      <h1>{project.name}</h1>
      <p>{project.description}</p>

      {error && <p role="alert">{error}</p>}


    <Card
      title="Tâches"
      actions={
        <FilterBar
          value={filter}
          onChange={setFilter}
        />
      }
    >
      <TaskForm onAdd={add} />

      <TaskList
        tasks={visible}
        onCycle={cycle}
        onRemove={remove}
      />
    </Card>

    </section>
  );
}
