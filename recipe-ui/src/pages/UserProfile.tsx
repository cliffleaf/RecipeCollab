import React, { useState } from "react";
import TopNav from "../components/TopNav";
import CommunityCard from "../components/CommunityCard";
import '../css/UserProfile.css';
import ProfileRecipeCard from "../components/ProfileRecipeCard";
import { useRef } from "react";
import AddIcon from '@atlaskit/icon/glyph/add'

const UserProfile = () => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [user, setUser] = useState({
        avatar: "https://via.placeholder.com/150",
        username: "JohnDoe",
        uploadedRecipes: [
            {
                id: "1",
                title: "Spaghetti Bolognese",
                author: "",
                imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
                community: "xxx"
            },
            {
                id: "1",
                title: "Spaghetti Bolognese",
                author: "",
                imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
                community: "xxx"
            },
            {
                id: "1",
                title: "Spaghetti Bolognese",
                author: "",
                imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
                community: "xxx"
            },
            {
                id: "1",
                title: "Spaghetti Bolognese",
                author: "",
                imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
                community: "xxx"
            },
            {
                id: "1",
                title: "Spaghetti Bolognese",
                author: "",
                imageUrl: "https://img.taste.com.au/_e6onvZ7/w720-h480-cfill-q80/taste/2024/03/5-ingredient-turbo-charged-spaghetti-recipe-196959-1.jpg",
                community: "xxx"
            },
        ],
        joinedCommunities: [
            {
                link: "/recipes",
                communityName: "Community 1",
                memberCount: 150,
                userPreferredName: "John",
            },
            {
                link: "/recipes",
                communityName: "Community 2",
                memberCount: 200,
                userPreferredName: "Johnny",
            },
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

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const avatarUrl = URL.createObjectURL(file);
            setUser({ ...user, avatar: avatarUrl });
        }
    };

    const handleAvatarClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <div className="app-container">
            <div className="app-top-nav">
                <TopNav />
            </div>
            <div className="user-profile">
                <div className="profile-section">
                    <div className="avatar-container">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="avatar"
                            onClick={handleAvatarClick}
                        />
                        <i className="edit-icon fas fa-edit" onClick={handleAvatarClick}></i>
                        <input
                            type="file"
                            ref={inputFileRef}
                            onChange={handleAvatarChange}
                            className="avatar-input"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className="communities-section">
                        {user.joinedCommunities.map((community, index) => (
                            <CommunityCard
                                key={index}
                                link={community.link}
                                communityName={community.communityName}
                                memberCount={community.memberCount}
                                userPreferredName={community.userPreferredName}
                                onLeaveCommunity={() => handleLeaveCommunity(community.communityName)}
                            />
                        ))}
                        <button onClick={handleAddCommunity} className="add-community-button">
                            <AddIcon label="" />
                        </button>
                    </div>
                    <div className="recipes-section">
                            {user.uploadedRecipes.map((recipe, index) => (
                                <ProfileRecipeCard 
                                    key={index}
                                    id={recipe.id}
                                    title={recipe.title}
                                    imgUrl={recipe.imageUrl}
                                />
                            ))}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default UserProfile;
