import React from "react";
import '../css/TopNav.css'
import {Link} from "react-router-dom";
import AddIcon from '@atlaskit/icon/glyph/add';
import HomeIcon from '@atlaskit/icon/glyph/home';

const TopNav = () => {
    return (
        <nav className="top-nav">
            <div className="nav-content">
                <Link to="/"><HomeIcon label="" /> </Link>
                <Link to="/upload"><AddIcon label="" /></Link>
            </div>
        </nav>
    )
};

export default TopNav;