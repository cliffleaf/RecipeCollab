import React, { useState } from "react";
import TopNav from "../components/TopNav";
import CommunityCard from "../components/CommunityCard";
import '../css/UserProfile.css';
import RecipeCard from "../components/RecipeCard";

const UserProfile = () => {
    const [user, setUser] = useState({
        avatar: "https://via.placeholder.com/150",
        username: "JohnDoe",
        uploadedRecipes: ["Spaghetti Bolognese", "Chicken Curry", "Beef Stew"],
        joinedCommunities: [
            {
                communityName: "Community 1",
                communityAvatar: "https://via.placeholder.com/100",
                memberCount: 150,
                userPreferredName: "John",
            },
            {
                communityName: "Community 2",
                communityAvatar: "https://via.placeholder.com/100",
                memberCount: 200,
                userPreferredName: "Johnny",
            }
        ],
    });

    const handleAddCommunity = () => {
        alert("Functionality to join new communities coming soon!");
    };

    const handleLeaveCommunity = (communityName: string) => {
        setUser({
            ...user,
            joinedCommunities: user.joinedCommunities.filter(
                (community) => community.communityName !== communityName
            ),
        });
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, username: e.target.value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const avatarUrl = URL.createObjectURL(file);
            setUser({ ...user, avatar: avatarUrl });
        }
    };

    return (
        <div className="app-container">
            <div className="app-top-nav">
                <TopNav />
            </div>
            <div className="user-profile">
                <div className="profile-section">
                    <input type="file" onChange={handleAvatarChange} className="avatar-input" />
                    <img src={user.avatar} alt="Avatar" className="avatar" />
                    <input
                        type="text"
                        value={user.username}
                        onChange={handleUsernameChange}
                        className="username-input"
                    />
                    <div className="recipes-section">
                        <h3>Uploaded Recipes</h3>
                        <ul>
                            {user.uploadedRecipes.map((recipe, index) => (
                                <RecipeCard 
                                    key={index}
                                    id=""
                                    title={recipe}
                                    author=""
                                    imgUrl=""
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="communities-section">
                    <h3>Joined Communities</h3>
                    {user.joinedCommunities.map((community, index) => (
                        <CommunityCard
                            key={index}
                            communityName={community.communityName}
                            communityAvatar={community.communityAvatar}
                            memberCount={community.memberCount}
                            userPreferredName={community.userPreferredName}
                            onLeaveCommunity={() => handleLeaveCommunity(community.communityName)}
                        />
                    ))}
                    <button onClick={handleAddCommunity} className="add-community-button">
                        Add Community
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
