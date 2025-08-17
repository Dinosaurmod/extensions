import PropTypes from 'prop-types';
import React from 'react';
import {intlShape} from 'react-intl';

import IntlGap from '../components/gap/gap.jsx';

class Gap extends React.Component {
    render () {
        const {
            size,
            ...props
        } = this.props;
        return (
            <IntlGap
                size={size}
                {...props}
            />
        );
    }
}

Gap.propTypes = {
    size: PropTypes.string,
    intl: intlShape
}

export default Gap;
