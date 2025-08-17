import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import MenuBar from '../../containers/menu-bar.jsx';
import ExtensionLibrary from '../../containers/extension-library.jsx';

import {BRAND_NAME} from '../../lib/brand.js';

import styles from './gui.css';

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
                <h1>{BRAND_NAME}</h1>
                <ExtensionLibrary
                    intl={intl}
                    {...componentProps}
                />
            </section>
        </div>
    )
}

GUIComponent.propTypes = {
    intl: intlShape
}

export default injectIntl(GUIComponent);