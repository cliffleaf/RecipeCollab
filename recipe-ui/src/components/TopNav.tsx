import React, { useState } from "react";
import '../css/TopNav.css'
import { Link } from "react-router-dom";
import MenuIcon from '@atlaskit/icon/glyph/menu'

const TopNav = () => {
    // const [currentCommunity, setCurrentCommunity] = useState("Community 1");
    // const communities = ["Community 1", "Community 2", "Community 3"];

    // const handleCommunityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCurrentCommunity(e.target.value);
    // };

    return (
        <nav className="top-nav">
            <div className="nav-content">
                <Link to="/"><MenuIcon label="" primaryColor="black" size="large" /></Link>
                {/* <select value={currentCommunity} onChange={handleCommunityChange} className="community-dropdown">
                    {communities.map((community) => (
                        <option key={community} value={community}>
                            {community}
                        </option>
                    ))}
                </select> */}
            </div>
        </nav>
    );
};

export default TopNav;
