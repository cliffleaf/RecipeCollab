import React, {useState} from 'react';
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
import Button, { ButtonGroup } from "@atlaskit/button";
import {Placeholder} from "@tiptap/extension-placeholder";

const RecipeEditor = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [editable, setEditable] = useState(true);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Heading,
            TextStyle,
            Underline,
            Placeholder,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            })],
        content: '<p></p>',
        editable: editable
    });

    if (!editor) {
        return null;
    }

    const handleSubmit = () => {
        if (editable) {
            const articleContent = editor.getHTML();
            const articleData = {
                title,
                category,
                author,
                content: articleContent,
            };
            alert(JSON.stringify(articleData));
            setEditable(false);
            editor.setEditable(false);
        } else {
            setEditable(true);
            editor.setEditable(true);
        }
    };

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleSubmit} value={editable ? 'Publish' : 'Modify'} >Publish</Button>
            <ButtonGroup>
                <Button onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}>
                    <FiBold/>
                </Button>
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}>
                    <FiList/>
                </Button>
                <Button onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'is-active' : ''}>
                    <FiUnderline/>
                </Button>
                {/* Add more icon buttons as needed */}
            </ButtonGroup>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="editor-input"
                placeholder="Recipe name"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="editor-input"
                placeholder="Category"
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="editor-input"
                placeholder="Author"
            />
            <EditorContent editor={editor} className="editor-content"/>
        </div>
    )
}

export default RecipeEditor;
