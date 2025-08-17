import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';

class GUI extends React.Component {
    render () {
        const {
            intl,
            ...props
        } = this.props;
        return (
            <h1>THIS IS A TEST</h1>
        );
    }
}

GUI.propTypes = {
    intl: intlShape
};

export default injectIntl(GUI);
