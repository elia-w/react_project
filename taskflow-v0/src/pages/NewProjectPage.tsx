
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import * as api from "../api";

type FormValues = {
  name: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Le nom doit contenir au moins 3 caractères.";
  }

  if (values.description.length > 200) {
    errors.description = "200 caractères maximum.";
  }

  return errors;
}

export function NewProjectPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    name: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = validate(values);
  const showErrors = submitted;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    setServerError(null);

    try {
      const project = await api.createProject({
        name: values.name.trim(),
        description: values.description.trim(),
      });

      navigate(`/projects/${project.id}`);
    } catch {
      setServerError(
        "La création a échoué. L'API est-elle démarrée ?"
      );
      setSaving(false);
    }
  }

  return (
    <section>
      <h1>Nouveau projet</h1>

      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="field">
          <label htmlFor="name">Nom du projet</label>

          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            aria-invalid={showErrors && !!errors.name}
            aria-describedby={
              showErrors && errors.name
                ? "name-error"
                : undefined
            }
          />

          {showErrors && errors.name && (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            aria-invalid={
              showErrors && !!errors.description
            }
            aria-describedby={
              showErrors && errors.description
                ? "description-error"
                : undefined
            }
          />

          <p className="small">
            {values.description.length} / 200
          </p>

          {showErrors && errors.description && (
            <p
              id="description-error"
              className="error"
              role="alert"
            >
              {errors.description}
            </p>
          )}
        </div>

        {serverError && (
          <p role="alert" className="error">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={saving}>
          {saving ? "Création..." : "Créer le projet"}
        </button>
      </form>
    </section>
  );
}
