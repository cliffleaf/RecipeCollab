import React from 'react';
import { ButtonItem } from '@atlaskit/side-navigation';

import '../css/SideNav.css';

const SideNav = () => {
    const handleSelected = () => {

    }

    return (
        <div id="side-nav">
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected} isSelected>All</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>Category 1</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>Category 2</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>Category 3</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>Category 4</ButtonItem>
            </section>
        </div>
    );
};

export default SideNav;