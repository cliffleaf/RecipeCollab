import React, { useEffect, useState } from 'react'; 
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { Crepe } from '@milkdown/crepe';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import { loadDoc, saveDoc } from '../api';

function EditorCore({ docId, onTitleChange }: { docId: string | null; onTitleChange?: (id: string, title: string) => void }) {
  const { get } = useEditor((root) => new Crepe({ root }));
  const [title, setTitle] = useState<string>('');

  // Load when docId changes
  useEffect(() => {
    const crepe = get();
    if (!crepe) return;

    (async () => {
      if (!docId) {
        setTitle('Untitled');
        (crepe as any).setMarkdown?.('');
        return;
      }
      const data = await loadDoc(docId); // { content, title }
      setTitle(data?.title ?? 'Untitled');
      (crepe as any).setMarkdown?.(data?.content ?? '');
    })();
  }, [docId, get]);

  const handleSave = async () => {
    const crepe = get();
    if (!crepe || !docId) return;
    const markdown: string = (crepe as any).getMarkdown?.() ?? '';
    await saveDoc(docId, markdown, title?.trim() || 'Untitled');
    onTitleChange?.(docId, title?.trim() || 'Untitled');
  };

  return (
    <div className="editor-area">
      <div className="editor-titlebar">
        <input
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled recipe"
        />
        <button className="save-btn" onClick={handleSave} disabled={!docId}>
          Save
        </button>
      </div>
      <Milkdown />
    </div>
  );
}

export default function MilkdownEditor({ docId, onTitleChange }: { docId: string | null; onTitleChange?: (id: string, title: string) => void }) {
  return (
    <MilkdownProvider>
      <EditorCore docId={docId} onTitleChange={onTitleChange} />
    </MilkdownProvider>
  );
}
