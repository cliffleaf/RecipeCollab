// src/components/NewDocButton.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NewDocButton({
  onCreated,
}: {
  onCreated: (id: string, title?: string) => void;
}) {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleNew = async () => {
    setPending(true);
    try {
        // const id = await createDoc('');     // create empty recipe, get id immediately
        const id = "1";
        onCreated(id, 'Untitled');          // update list in parent
        navigate(`/recipes/${id}`);         // go straight to the editor for this id
    } finally {
        setPending(false);
    }
    };

  return (
    <button className="new-btn" onClick={handleNew} disabled={pending}>
      {pending ? 'Creating…' : '+ New'}
    </button>
  );
}
