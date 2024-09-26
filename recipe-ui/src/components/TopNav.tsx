import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@atlaskit/icon/glyph/menu'
import PersonIcon from '@atlaskit/icon/glyph/person'

const TopNav = () => {
    return (
        <nav className="top-nav">
            <div className="nav-content">
                <Link to="/"><MenuIcon label="" primaryColor="black" size="large" /></Link>
            </div>
            <div className="nav-content">
            <Link to="/login"><PersonIcon label="" primaryColor="black" size="large" /></Link>
            </div>
        </nav>
    );
};

export default TopNav;
