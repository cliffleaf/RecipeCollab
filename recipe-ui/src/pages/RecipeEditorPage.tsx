import { useParams } from 'react-router-dom';
import MilkdownEditor from '../components/MilkdownEditor';

export default function RecipeEditorPage({ onTitleChange }: { onTitleChange?: (id: string, title: string) => void }) {
  const { id } = useParams<{ id: string }>();
  return <MilkdownEditor docId={id ?? null} onTitleChange={onTitleChange} />;
}
