import React, { useEffect, useRef, useState } from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { Crepe } from '@milkdown/crepe';

// Styles
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

// Milkdown utils & listener plugin (stable across versions)
import { replaceAll } from '@milkdown/utils';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

import { loadDoc, saveDoc } from '../api';

type Props = {
  docId: string | null;
  onTitleChange?: (id: string, title: string) => void;
};

function EditorCore({ docId, onTitleChange }: Props) {
  // Keep the actual Crepe instance, instead of useEditor().get() which is a Milkdown Editor
  const crepeRef = useRef<Crepe | null>(null);

  // Create Crepe once and stash the instance in a ref.
  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root,
      features: {
        [Crepe.Feature.Toolbar]: true,
        [Crepe.Feature.Placeholder]: true,
      },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: { text: 'Start writing...', mode: 'block' },
      },
      defaultValue: '', // we inject real content after load
    });
    crepeRef.current = crepe;
    return crepe;
  });

  // Title & guard so loads don’t clobber user typing
  const [title, setTitle] = useState<string>('Untitled');
  const userEditedTitleRef = useRef(false);
  const [showToast, setShowToast] = useState(false);

  // Live markdown cache (filled by listener plugin)
  const mdRef = useRef<string>('');

  // Attach listener plugin ONCE to the inner Milkdown editor so we always
  // have the latest markdown in mdRef — works even if Crepe’s .on/.listen API varies.
  const listenerAttachedRef = useRef(false);
  useEffect(() => {
    const crepe = crepeRef.current ?? (get() as unknown as Crepe | null);
    if (!crepe || listenerAttachedRef.current) return;

    // Crepe wraps a Milkdown Editor on `crepe.editor`
    const inner = (crepe as any).editor;
    if (!inner) return;

    // Ensure listener plugin is loaded and hook markdown updates
    inner.use(listener);
    inner.action((ctx: any) => {
      ctx.get(listenerCtx).markdownUpdated((_: any, markdown: string) => {
        mdRef.current = markdown ?? '';
      });
    });

    listenerAttachedRef.current = true;
  }, [get]);

  // Helper: set markdown for current doc (handles versions without setMarkdown)
  const setMarkdownCompat = (markdown: string) => {
    const crepe = crepeRef.current ?? (get() as unknown as Crepe | null);
    if (!crepe) return;

    // Prefer native method if present
    const maybeSet = (crepe as any).setMarkdown;
    if (typeof maybeSet === 'function') {
      maybeSet.call(crepe, markdown);
      return;
    }

    // Fallback: use Milkdown's replaceAll via the inner editor
    const inner = (crepe as any).editor;
    if (inner && typeof inner.action === 'function') {
      inner.action(replaceAll(markdown || ''));
    }
  };

  // Reset the "user edited title" flag on doc switch
  useEffect(() => {
    userEditedTitleRef.current = false;
  }, [docId]);

  // Load content when docId changes; do NOT depend on anything else.
  useEffect(() => {
    let alive = true;
    (async () => {
      const data = docId
        ? await loadDoc(docId) // { content, title } | null
        : { content: '', title: 'Untitled' };

      if (!alive) return;

      // Inject content (compat sets via replaceAll if needed)
      setMarkdownCompat(data?.content ?? '');

      // Seed cache so Save has something even before the first change event
      mdRef.current = data?.content ?? '';

      // Only set title if the user hasn’t started typing locally
      if (!userEditedTitleRef.current) {
        setTitle((data?.title ?? 'Untitled') || 'Untitled');
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  // Title edit
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userEditedTitleRef.current = true;
    setTitle(e.target.value);
  };

  // Save: prefer crepe.getMarkdown() if it exists; otherwise use mdRef
  const handleSave = async () => {
    if (!docId) return;
    const crepe = crepeRef.current ?? (get() as unknown as Crepe | null);
    const nextTitle = (title?.trim() || 'Untitled');

    let markdown = mdRef.current ?? '';
    try {
      const maybeGet = (crepe as any)?.getMarkdown;
      if (typeof maybeGet === 'function') {
        markdown = maybeGet.call(crepe) ?? markdown;
      }
    } catch {
      // fall back to cached mdRef
    }

    try {
      await saveDoc(docId, markdown, nextTitle);
      onTitleChange?.(docId, nextTitle);
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 1500);
    } catch (e) {
      // Make sure your saveDoc() doesn’t try to JSON-parse empty bodies.
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
          onMouseDown={(e) => e.preventDefault()} // avoid editor focus quirks
          onClick={handleSave}
          disabled={!docId}
        >
          Save
        </button>
      </div>
      <Milkdown />
      <div className={`save-toast ${showToast ? 'show' : ''}`}>Saved</div>
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
