// src/components/MilkdownEditor.tsx
import React, { useEffect } from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { Crepe } from '@milkdown/crepe';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import { loadDoc, saveDoc } from '../api';

function EditorCore({ docId }: { docId: string | null }) {
  const { get } = useEditor((root) => new Crepe({ root }));

  // Load when docId changes
  useEffect(() => {
    const crepe = get();
    if (!crepe) return;

    (async () => {
      const markdown = docId ? await loadDoc(docId) : '';
      (crepe as any).setMarkdown?.(markdown || '');
    })();
  }, [docId, get]);

  const handleSave = async () => {
    const crepe = get();
    if (!crepe || !docId) return;
    const markdown: string = (crepe as any).getMarkdown?.() ?? '';
    await saveDoc(docId, markdown);
  };

  return (
    <div className="editor-area">
      <div className="editor-toolbar">
        <button className="save-btn" onClick={handleSave} disabled={!docId}>
          Save
        </button>
      </div>
      <Milkdown />
    </div>
  );
}

export default function MilkdownEditor({ docId }: { docId: string | null }) {
  return (
    <MilkdownProvider>
      <EditorCore docId={docId} />
    </MilkdownProvider>
  );
}
