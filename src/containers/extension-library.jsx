import PropTypes from 'prop-types';
import React from 'react';
import {intlShape} from 'react-intl';

import LibraryItem from '../components/library-item/library-item.jsx';

import extensionsData from '../extensions.jsx';

class ExtensionLibrary extends React.Component {
    render () {
        const {
            ...props
        } = this.props;

        const extensionNodes = [];

        extensionsData.forEach(item => {
            extensionNodes.push(
                <LibraryItem
                    {...props}
                    featured={item.featured}
                    name={item.name}
                    extensionId={item.extensionId}
                    iconURL={item.iconURL}
                    description={item.description}
                    internetConnectionRequired={item.internetConnectionRequired}
                    credits={item.credits}
                    extDeveloper={item.extDeveloper}

                    onBlur={() => {}}
                    onClick={() => {}}
                    onFocus={() => {}}
                    onKeyPress={() => {}}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                />
            )
        });

        return (
            {extensionNodes}
        );
    }
}

export default ExtensionLibrary;