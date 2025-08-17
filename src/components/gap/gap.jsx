import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import './gap.css';

const GapComponent = function (props) {
    const { intl, size = '1rem' } = props;
    return (
        <div id="gap" style={{ height: size }} />
    )
}

GapComponent.propTypes = {
    size: PropTypes.string,
    intl: intlShape
};

const IntlGap = injectIntl(GapComponent);
export default (IntlGap)