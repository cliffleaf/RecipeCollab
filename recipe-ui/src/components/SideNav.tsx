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
                <ButtonItem onClick={handleSelected}>家常菜</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>便当</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>主食</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>硬菜</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem onClick={handleSelected}>甜品</ButtonItem>
            </section>
        </div>
    );
};

export default SideNav;