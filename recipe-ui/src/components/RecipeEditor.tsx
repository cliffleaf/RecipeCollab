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
import ImageIcon from '@atlaskit/icon/glyph/image'

import '../css/Recipe.css';
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
        imgUrl: string | null;
    };
};

const RecipeEditor: React.FC<RecipeEditorProps> = ( { recipe } ) => {
    const navigate = useNavigate();
    // if there is data, then the page was redirected from "edit" button, not "upload new" button
    const [formData, setFormData] = useState({
        id: recipe.id || null,
        title: recipe.title || '',
        categories: recipe?.categories || [],
        article: recipe.article || '',
        imgUrl: recipe?.imgUrl || null,
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

    const [thumbnailChanged, setThumbnailChanged] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnailChanged(true);
        const file = event.target.files?.[0];
        if (file) {
            // Create a preview URL for the selected image
            const previewURL = URL.createObjectURL(file);
            setThumbnailPreview(previewURL);
        }
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

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            categories: selectedCategories,
            article: editor.getHTML(),
        };
    
        if (thumbnailChanged && thumbnailPreview) {
            const fileInput = document.getElementById('thumbnail');
            const file = fileInput.files[0];
            payload.img = await convertFileToBase64(file);
        }
    
        try {
            const url = formData.id 
                ? `https://your-api-endpoint/recipes/${formData.id}` // Update endpoint
                : 'https://your-api-endpoint/recipes'; // Create endpoint
    
            const method = formData.id ? 'PUT' : 'POST';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Failed to publish recipe');
            }
    
            // Redirect to the recipe viewer page
            navigate(`/recipes/${formData.id || (await response.json()).id}`);
        } catch (error) {
            console.error('Error publishing recipe:', error);
        }
    };
    
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    

    return (
        <div className="editor-container">
             <div className="title-publish-container" style={{ display: "flex",  alignItems: "center", marginBottom: "20px" }}>
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="h1-style-input"
                    placeholder="Title"
                    style={{ flex: "1", marginRight: "20px" }}
                />
                <Button appearance="primary" onClick={handleSubmit}>Publish</Button>
            </div>
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
            {/* Thumbnail Upload Section */}
            <div className="thumbnail-upload">
                <label htmlFor="thumbnail">
                    <ImageIcon label="Upload Thumbnail" size="large" />
                    <div className="thumbnail-caption">Choose Thumbnail</div>
                </label>
                <input 
                    type="file" 
                    id="thumbnail" 
                    name="thumbnail" 
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleThumbnailChange} // Handle file input change
                />
            </div>

            {thumbnailPreview && (
                <div className="thumbnail-preview">
                    <img src={thumbnailPreview} alt="Thumbnail Preview" />
                </div>
            )}
        </div>
    );
};

export default RecipeEditor;
