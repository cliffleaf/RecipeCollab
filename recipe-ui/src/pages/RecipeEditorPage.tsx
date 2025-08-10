import { useParams } from 'react-router-dom';
import MilkdownEditor from '../components/MilkdownEditor';

export default function RecipeEditorPage() {
  const { id } = useParams<{ id: string }>();
  return <MilkdownEditor docId={id ?? null} />;
}
