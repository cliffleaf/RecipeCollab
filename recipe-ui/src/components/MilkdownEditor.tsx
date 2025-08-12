import React, { useEffect, useRef, useState } from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import { Crepe } from '@milkdown/crepe';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import { loadDoc, saveDoc } from '../api';

type Props = {
  docId: string | null;
  onTitleChange?: (id: string, title: string) => void;
};

function EditorCore({ docId, onTitleChange }: Props) {
  const { get } = useEditor((root) => new Crepe({ root }));
  const contentRef = useRef<string>('');

  const [title, setTitle] = useState<string>('Untitled');

  // Track if user has edited the title to avoid loader overwriting it.
  const userEditedTitleRef = useRef(false);

  // Reset the “user edited” flag whenever we switch to a new doc
  useEffect(() => {
    userEditedTitleRef.current = false;
  }, [docId]);

  // LOAD only when docId changes
  useEffect(() => {
    const crepe = get();
    if (!crepe) return;

    let alive = true;

    (async () => {
      const data = docId ? await loadDoc(docId) : { content: '', title: 'Untitled' };

      if (!alive) return;

      // Only set the title if user hasn't started typing yet
      if (!userEditedTitleRef.current) {
        setTitle((data?.title ?? 'Untitled') || 'Untitled');
      }

      (crepe as any).setMarkdown?.(data?.content ?? '');
      contentRef.current = data?.content ?? '';
    })();

    return () => {
      alive = false;
    };
  }, [docId, get]);

  useEffect(() => {
    const crepe = get();
    if (!crepe) return;

    const off = (crepe as any).onChange?.((_: unknown, md: string) => {
      contentRef.current = md ?? '';
    });

    return () => {
      if (typeof off === 'function') off();
    };
  }, [get]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userEditedTitleRef.current = true;
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    if (!docId) return;
    const nextTitle = (title?.trim() || 'Untitled');
    // const crepe = get?.();
    // const markdown =
    //   (crepe as any)?.getMarkdown?.()        // preferred: read from editor crepe.editor.action(getMarkdown())
    //   ?? contentRef.current                  // fallback if API not present
    //   ?? '';
    const editor = new Crepe({
      root: '#editor', // DOM element or selector
      features: {
        [Crepe.Feature.Toolbar]: true,
        [Crepe.Feature.Latex]: true,
      }
    })

    // Get markdown content
    const markdown = editor.getMarkdown()
    console.log("markdown " + markdown)

    try {
      await saveDoc(docId, markdown, nextTitle);
      onTitleChange?.(docId, nextTitle);
    } catch (e) {
      console.error('Save failed', e);
    }
  };

  return (
    <div className="editor-area">
      <div className="editor-titlebar">
        <input
          className="title-input"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled recipe"
        />
        <button
          className="save-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleSave}
          disabled={!docId}
        >
          Save
        </button>
      </div>
      <Milkdown />
    </div>
  );
}

export default function MilkdownEditor({ docId, onTitleChange }: Props) {
  return (
    <MilkdownProvider>
      <EditorCore docId={docId} onTitleChange={onTitleChange} />
    </MilkdownProvider>
  );
}
