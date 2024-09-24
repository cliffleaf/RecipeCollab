import React, { useState } from "react";
import '../css/CommunityCard.css';

interface CommunityCardProps {
    communityName: string;
    communityAvatar: string;
    memberCount: number;
    userPreferredName: string;
    onLeaveCommunity: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ communityName, communityAvatar, memberCount, userPreferredName, onLeaveCommunity }) => {
    const [preferredName, setPreferredName] = useState(userPreferredName);
    const handlePreferredNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreferredName(e.target.value);
    };

    return (
        <div className="community-card">
            <img src={communityAvatar} alt="Community Avatar" className="community-avatar" />
            <div className="community-details">
                <h4>{communityName}</h4>
                <p>{memberCount} members</p>
                <input
                    type="text"
                    value={preferredName}
                    onChange={handlePreferredNameChange}
                    className="preferred-name-input"
                    placeholder="Your preferred name"
                />
                <button onClick={onLeaveCommunity} className="leave-community-button">
                    Leave Community
                </button>
            </div>
        </div>
    );
};

export default CommunityCard;
