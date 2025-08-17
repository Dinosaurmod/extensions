import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import MenuBar from '../../containers/menu-bar.jsx';
import ExtensionLibrary from '../../containers/extension-library.jsx';

import './gui.css';

const GUIComponent = props => {
    const {
        intl,
        ...componentProps
    } = omit(props, 'dispatch')

    return (
        <div>
            <MenuBar
                intl={intl}
                {...componentProps}
            />
            <section>
                <h1>DinosaurMod Extensions</h1>
                <p>The DinosaurMod Extension page is currently in development.</p>
                <p>As there are LOTS of visual bugs and limitations.</p>
            </section>
            <ExtensionLibrary
                intl={intl}
                {...componentProps}
            />
        </div>
    )
}

GUIComponent.propTypes = {
    intl: intlShape
}

export default injectIntl(GUIComponent);