import React from 'react';
import { ButtonItem } from '@atlaskit/side-navigation';

import '../css/SideNav.css';

const SideNav = () => {
    return (
        <div id="side-nav">
            <section className="side-nav-items">
                <ButtonItem>Category 1</ButtonItem>
            </section>
            <section className="side-nav-items">
                <ButtonItem isSelected>Category 2</ButtonItem>
            </section>
        </div>
    );

};

export default SideNav;