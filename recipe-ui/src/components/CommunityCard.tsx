import React, { useState } from "react";
import '../css/CommunityCard.css';
import EditIcon from '@atlaskit/icon/glyph/edit';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { Link } from "react-router-dom";

interface CommunityCardProps {
    link: string;
    communityName: string;
    memberCount: number;
    userPreferredName: string;
    onLeaveCommunity: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ link, communityName, memberCount, userPreferredName, onLeaveCommunity }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(userPreferredName);

    const handlePreferredNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleEditClick = () => {
        if (isEditing) {
            // Save the preferred name when exiting edit mode
            setName(name);
        }
        setIsEditing(!isEditing); // Toggle between edit and non-edit modes
    };

    return (
        <div className="community-card">
            <div className="community-details">
                <h4><Link to={link}>{communityName} ({memberCount})</Link></h4>
                <div className="preferred-name-container">
                    <input
                        type="text"
                        value={name}
                        onChange={handlePreferredNameChange}
                        className="preferred-name-input"
                        placeholder="Your preferred name"
                        disabled={!isEditing} // Disable input when not editing
                    />
                    <button onClick={handleEditClick} className="edit-save-button">
                        {isEditing ? (
                            <CheckIcon label="" size="small" />
                        ) : (
                            <EditIcon label="" size="small" />
                        )}
                    </button>
                </div>
            </div>
            <button onClick={onLeaveCommunity} className="leave-community-button">
                Leave
            </button>
        </div>
    );
};

export default CommunityCard;
