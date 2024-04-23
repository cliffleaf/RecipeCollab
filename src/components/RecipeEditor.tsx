import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Button, {ButtonGroup} from '@atlaskit/button';
import { FiBold, FiUnderline, FiList } from 'react-icons/fi';
import {Paragraph} from "@tiptap/extension-paragraph";
import {Heading} from "@tiptap/extension-heading";
import {TextStyle} from "@tiptap/extension-text-style";
import {Underline} from "@tiptap/extension-underline";
import {Placeholder} from "@tiptap/extension-placeholder";
import {TextAlign} from "@tiptap/extension-text-align";
import {Document} from "@tiptap/extension-document";
import {Text} from "@tiptap/extension-text";

import '../css/RecipeEditor.css';

type RecipeEditorProps = {
    recipe: {
        title: string | null;
        author: string | null;
        category: string | null;
        article: string | null;
    };
};

const RecipeEditor: React.FC<RecipeEditorProps> = ( { recipe } ) => {
    // if there is data, then the page was redirected from "edit" button, not "upload new" button
    const [formData, setFormData] = useState({
        title: recipe?.title || '',
        author: recipe?.author || '',
        category: recipe?.category || '',
        article: recipe?.article || '',
    });

    const [editable, setEditable] = useState(true);

    // Tiptap editor initialization
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
        content: formData.article, // Preload content if editing
        editable: editable
    });

    if (!editor) {
        return null;
    }

    // Update individual form field states
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        if (editable) {
            const articleContent = editor.getHTML();
            const updatedData = {
                ...formData,
                article: articleContent
            };
            alert(JSON.stringify(updatedData));
            setEditable(false);
            editor.setEditable(false);
        } else {
            setEditable(true);
            editor.setEditable(true);
        }
    };

    if (!editor) {
        return null; // Ensure editor is initialized
    }

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleSubmit}>
                {editable ? 'Publish' : 'Modify'}
            </Button>
            <ButtonGroup>
                <Button onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}>
                    <FiBold />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'is-active' : ''}>
                    <FiUnderline />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}>
                    <FiList />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}>
                    <FiList />
                </Button>
            </ButtonGroup>
            <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="editor-input"
                placeholder="Title"
            />
            <input
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                className="editor-input"
                placeholder="Author"
            />
            <input
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="editor-input"
                placeholder="Category"
            />
            <EditorContent editor={editor} className="editor-content" />
        </div>
    );
};

export default RecipeEditor;
