import {useState, useEffect, useMemo, useRef} from "react";

type Props = {
  task: {
    title: string;
  };
};

function TaskEditor({ task }: Props) {
  const [title, setTitle] = useState(task.title); // case 1
  const [saving, setSaving] = useState(false); // case 2
  const inputRef = useRef<HTMLInputElement>(null); // case 3

  useEffect(() => {
    inputRef.current?.focus();
  }, []); // case 4

  const words = useMemo(
    () => countWords(title),
    [title]
  ); // case 5

  return (
    <form>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <small>{words} mots</small>
      <button disabled={saving}>Enregistrer</button>
    </form>
  );
}

function countWords(title: any): any {
    throw new Error("Function not implemented.");
}
