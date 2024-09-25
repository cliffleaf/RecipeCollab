import React, { useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import {Paragraph} from "@tiptap/extension-paragraph";
import {Heading} from "@tiptap/extension-heading";
import {TextStyle} from "@tiptap/extension-text-style";
import {Underline} from "@tiptap/extension-underline";
import {Placeholder} from "@tiptap/extension-placeholder";
import {TextAlign} from "@tiptap/extension-text-align";
import {Document} from "@tiptap/extension-document";
import {Text} from "@tiptap/extension-text";
import StarterKit from '@tiptap/starter-kit';

import Button, {ButtonGroup} from '@atlaskit/button';
import EditorNumberListIcon from '@atlaskit/icon/glyph/editor/number-list';
import EditorBulletListIcon from '@atlaskit/icon/glyph/editor/bullet-list';
import EditorBoldIcon from '@atlaskit/icon/glyph/editor/bold';
import EditorUnderlineIcon from '@atlaskit/icon/glyph/editor/underline';
import EditorItalicIcon from '@atlaskit/icon/glyph/editor/italic';

import '../css/RecipeEditor.css';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {predefinedCategories} from "../config";

type RecipeEditorProps = {
    recipe: {
        id: string | null;
        title: string | null;
        author: string | null;
        categories: string[] | null;
        article: string | null;
    };
};

const RecipeEditor: React.FC<RecipeEditorProps> = ( { recipe } ) => {
    const navigate = useNavigate();
    // if there is data, then the page was redirected from "edit" button, not "upload new" button
    const [formData, setFormData] = useState({
        id: recipe?.id || null,
        title: recipe?.title || '',
        author: recipe?.author || '',
        categories: recipe?.categories || [],
        article: recipe?.article || '',
    });

    useEffect(() => {
        if (formData.categories.length > 0) {
            setSelectedCategories(formData.categories);
        }
    }, [formData.categories]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>(formData.categories || []);
    const handleCategorySelect = (category: string) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(category)
                ? prevSelected.filter(c => c !== category)
                : [...prevSelected, category]
        );
    };

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
        content: formData.article,
    });

    if (!editor) return null;

    // Update individual form field states
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // TODO
        const recipeId = "1";
        navigate(`/recipes/${recipeId}`);
    };

    return (
        <div className="editor-container">
            <div style={{display: "block", marginBottom: "20px", marginLeft: "80%"}}>
                <Button appearance="primary" onClick={handleSubmit}>Publish</Button>
            </div>
            
            <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="editor-input h1-style-input"
                placeholder="Title"
            />
            <div className="category-selection">
                {predefinedCategories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className={selectedCategories.includes(category) ? 'category-chip-edit selected' : 'category-chip-edit'}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className='editor-section'>
                <ButtonGroup>
                    <Button onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active' : ''}>
                        <EditorBoldIcon label="" />
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'is-active' : ''}>
                        <EditorItalicIcon label="" />
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive('underline') ? 'is-active' : ''}>
                        <EditorUnderlineIcon label="" />
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}>
                        <EditorBulletListIcon label="" />
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'is-active' : ''}>
                        <EditorNumberListIcon label="" />
                    </Button>
                </ButtonGroup>
                <EditorContent editor={editor} className="editor-content" />
            </div>
        </div>
    );
};

export default RecipeEditor;
