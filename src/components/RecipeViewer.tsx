import React, {useState} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import '../css/RecipeViewer.css'
import Button from "@atlaskit/button";
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';

const RecipeViewer = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');

    const handleClick = () => {

    }

    return (
        <div className="editor-container">
            <Button appearance="primary" onClick={handleClick}><EditFilledIcon label="" /></Button>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="editor-input"
                placeholder="Title"
            />
            <text></text>
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
        </div>
    );
}

export default RecipeViewer;
