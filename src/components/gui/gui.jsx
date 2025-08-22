import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import MenuBar from '../../containers/menu-bar.jsx';
import ExtensionLibrary from '../../containers/extension-library.jsx';

import Gap from '../../containers/gap.jsx';

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
                <Gap size="60px" />
                <h1>DinosaurMod Extensions</h1>
            </section>
            <ExtensionLibrary
                intl={intl}
                {...componentProps}
            />
            <section>
                <p>Note: Some Extensions may be added to the Main Extension Gallery in DinosaurMod.</p>
                <Gap size="30px" />
                <h3>DinosaurMod is not affiliated with PenguinMod, TurboWarp, Scratch, the Scratch Team, or the Scratch Foundation.</h3>
                <Gap size="10px" />
                <p><a href="https://github.com/Dinosaurmod/extensions">GitHub</a></p>
            </section>
        </div>
    )
}

GUIComponent.propTypes = {
    intl: intlShape
}

export default injectIntl(GUIComponent);