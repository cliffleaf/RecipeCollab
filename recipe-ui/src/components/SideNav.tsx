import React from 'react';
import { ButtonItem } from '@atlaskit/side-navigation';

import '../css/SideNav.css';

import {predefinedCategories} from "../config";

const SideNav = () => {
    const handleSelected = () => {
        alert("Still working on this feature");
    }

    return (
        <div id="side-nav">
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected} isSelected>All</ButtonItem>
            </section>
            {predefinedCategories.map((category, index) => (
                <section className="side-nav-items" key={index}>
                    <ButtonItem onClick={handleSelected}>{category}</ButtonItem>
                </section>
            ))}
        </div>
    );
};

export default SideNav;