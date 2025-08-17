import PropTypes from 'prop-types';
import React from 'react';
import {intlShape} from 'react-intl';

import IntlMenuBar from '../components/menu-bar/menu-bar.jsx';

class MenuBar extends React.Component {
    render () {
        const {
            ...props
        } = this.props;
        return (
            <IntlMenuBar
                {...props}
            />
        );
    }
}

export default MenuBar;
