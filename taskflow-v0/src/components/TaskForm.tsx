
import { useState, type FormEvent } from "react";
import type { Priority } from "../type";

type Props = {
  onAdd: (title: string, priority: Priority) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(2);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), priority);

    setTitle("");
    setPriority(2);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        maxLength={80}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(Number(e.target.value) as Priority)
        }
        aria-label="Priorité"
      >
        <option value={1}>Haute</option>
        <option value={2}>Moyenne</option>
        <option value={3}>Basse</option>
      </select>

      <button type="submit" disabled={!title.trim()}>
        Ajouter
      </button>
    </form>
  );
}
