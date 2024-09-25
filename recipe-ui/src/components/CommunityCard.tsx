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
            {/* <img src={communityAvatar} alt="Community Avatar" className="community-avatar" /> */}
            <div className="community-details">
                <h4>{communityName} ({memberCount})</h4>
                <input
                    type="text"
                    value={preferredName}
                    onChange={handlePreferredNameChange}
                    className="preferred-name-input"
                    placeholder="Your preferred name"
                />
            </div>
            <button onClick={onLeaveCommunity} className="leave-community-button">
                Leave
            </button>
        </div>
    );
};

export default CommunityCard;
