import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';

import moonIcon from './moon.svg';

import './menu-bar.css';

const MenuBarComponent = function (props) {
    const { intl } = props;
    return (
        <nav className="menu-bar">
            <ul className="menu-bar_ul">
                <li className="menu-bar_li">
                    <a id="IconImage"><img src="https://dinosaurmod.github.io/favicon.ico" alt="Icon"/></a>
                </li>
                <li className="menu-bar_li">
                    <a className="menu-bar_a" id="darkModeToggle"><img src={moonIcon} alt="Moon Icon"/></a>
                </li>
            </ul>
            {/*<label id="icon">
                <i className="fas fa-bars"></i>
            </label>*/}
        </nav>
    )
}

MenuBarComponent.propTypes = {
    intl: intlShape
};

const IntlMenuBar = injectIntl(MenuBarComponent);
export default (IntlMenuBar)