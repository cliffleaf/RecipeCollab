export type DocListItem = { id: string; title: string };

export async function listDocs(): Promise<DocListItem[]> {
  const res = await fetch('/api/docs');
  if (!res.ok) return [];
  return res.json(); // expect: [{ id, title }]
}

export async function loadDoc(docId: string): Promise<string | null> {
  const res = await fetch(`/api/docs/${docId}`);
  if (!res.ok) return null;
  const data = await res.json(); // expect: { content: string }
  return (data?.content as string) ?? '';
}

export async function saveDoc(docId: string, content: string) {
  await fetch(`/api/docs/${docId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
}

export async function createDoc(content: string): Promise<string> {
  const res = await fetch(`/api/docs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to create doc');
  const data = await res.json(); // expect: { id: string }
  return data.id as string;
}
