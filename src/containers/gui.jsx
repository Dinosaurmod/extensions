import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';

import GUIComponent from '../components/gui/gui.jsx';

class GUI extends React.Component {
    render () {
        const {
            intl,
            ...props
        } = this.props;
        return (
            <GUIComponent
                intl={intl}
                {...props}
            />
        );
    }
}

GUI.propTypes = {
    intl: intlShape
};

export default injectIntl(GUI);
