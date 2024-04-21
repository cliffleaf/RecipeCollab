import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align'
import { FiBold, FiList, FiUnderline } from 'react-icons/fi';
import '../css/RecipeEditor.css'

const RecipeEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Heading,
            TextStyle,
            Underline,
            TextAlign.configure({types: ['heading', 'paragraph'],
        })],
        content: '<p>Hello World!</p>',
    });
    // editor?.commands.setTextAlign('left');

    if (!editor) {
        return null;
    }

    return (
        <div className="editor-container">
            <div className="button-group">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                    <FiBold />
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
                    <FiList />
                </button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline' ) ? 'is-active' : ''}>
                    <FiUnderline />
                </button>
                {/* Add more icon buttons as needed */}
            </div>
            <EditorContent editor={editor}  />
        </div>
    );
}

export default RecipeEditor;
