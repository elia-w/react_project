import { Routes, Route, useParams } from "react-router";
import { Layout } from "./components/Layout";

function ProjectsPage() {
  return <h1>Liste des projets</h1>;
}

function NewProjectPage() {
  return <h1>Nouveau projet</h1>;
}

function ProjectPage() {
  const { id } = useParams();

  return <h1>Projet : {id}</h1>;
}

function AboutPage() {
  return <h1>À propos de TaskFlow</h1>;
}

function NotFoundPage() {
  return <h1>404 - Page introuvable</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProjectsPage />} />
        <Route path="projects/new" element={<NewProjectPage />} />
        <Route path="projects/:id" element={<ProjectPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
