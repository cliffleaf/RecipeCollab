import React, { useEffect, useCallback, useState } from 'react';
import { useHelpers, useRemirrorContext } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import type { RemirrorJSON } from 'remirror';


/** --- Replace these with your real API calls --- */
async function loadDoc(docId: string): Promise<RemirrorJSON | null> {
  const res = await fetch(`/api/docs/${docId}`);
  if (!res.ok) return null;
  const data = await res.json(); // expect: { content: RemirrorJSON }
  return data?.content ?? null;
}

async function saveDoc(docId: string, content: RemirrorJSON) {
  await fetch(`/api/docs/${docId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
}

async function createDoc(content: RemirrorJSON): Promise<string> {
  const res = await fetch(`/api/docs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to create doc');
  const data = await res.json(); // expect: { id: string }
  return data.id;
}


function AutoLoad({ docId }: { docId?: string | null }) {
  if (!docId) {
    return null;
  }

  const { setContent } = useRemirrorContext();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const content = await loadDoc(docId);
        if (alive && content) {
          // This automatically renders as rich text in the editor
          setContent(content);
        }
      } catch {
        // optional: surface a toast/log
      }
    })();
    return () => {
      alive = false;
    };
  }, [docId, setContent]);

  return null;
}

function SaveButton({
  docId,
  onDocIdAssigned,
}: {
  docId?: string | null;
  onDocIdAssigned?: (id: string) => void;
}) {
  const { getJSON } = useHelpers();

  const handleSave = useCallback(async () => {
    const json = getJSON(); // RemirrorJSON
    if (docId) {
      await saveDoc(docId, json);
    } else {
      const newId = await createDoc(json);
      onDocIdAssigned?.(newId);
    }
  }, [docId, getJSON, onDocIdAssigned]);

  return (
    <button onMouseDown={(e) => e.preventDefault()} onClick={handleSave}>
      Save
    </button>
  );
}

const Basic: React.FC<{
  docId?: string | null;
  onDocIdAssigned?: (id: string) => void;
}> = ({ docId: initialDocId = null, onDocIdAssigned }) => {
  const [docId, setDocId] = useState<string | null>(initialDocId);

  return (
    <WysiwygEditor>
      <AutoLoad docId={docId} />
      <SaveButton
        docId={docId}
        onDocIdAssigned={(id) => {
          setDocId(id);
          onDocIdAssigned?.(id);
        }}
      />
    </WysiwygEditor>
  );
};

export default Basic;