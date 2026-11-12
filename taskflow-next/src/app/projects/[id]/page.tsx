import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

// Dossier [id] : une page pour chaque projet (/projects/site-esiee…)
export default async function ProjectPage({ params }: Props) {
  const { id } = await params; // la partie variable de l'adresse
  const project = await getProject(id);
  if (!project) notFound(); // affiche la page 404 (app/not-found.tsx à l'étape 6)

  return (
    <section>
      <Link href="/" className="small">
        ← Tous les projets
      </Link>
      <h1>{project.name}</h1>
      <p className="muted">{project.description}</p>
      {/* Étape 5 : remplacé par <TaskBoard tasks={project.tasks} /> */}
      <p>{project.tasks.length} tâche(s)</p>
    </section>
  );
}
