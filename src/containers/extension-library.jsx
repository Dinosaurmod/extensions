import PropTypes from 'prop-types';
import React from 'react';
import {intlShape} from 'react-intl';
import classNames from 'classnames';

import LibraryItem from '../components/library-item/library-item.jsx';

import extensionsData from '../extensions.jsx';

class ExtensionLibrary extends React.Component {
    render () {
        const {
            ...props
        } = this.props;

        const extensionNodes = [];

        extensionsData[0].forEach(item => {
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
                    extDeveloperHREF={item.extDevHREF}
                    inspiredExt={item.inspiredExt}

                    onBlur={() => {}}
                    onClick={() => {}}
                    onFocus={() => {}}
                    onKeyPress={() => {}}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                />
            )
        });
        extensionNodes.push(
            <p
                className={classNames(
                    "libraryItem",
                    "featuredItem"
                )}
            >
                Joke / Livetests Extensions:
            </p>
        );
        extensionsData[1].forEach(item => {
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
                    extDeveloperHREF={item.extDevHREF}
                    inspiredExt={item.inspiredExt}

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
            <React.Fragment>
                <style>
                    {`
.extension-library {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    justify-content: center;
    align-items: flex-start;
}
                    `}
                </style>
                <div className="extension-library">
                    {extensionNodes}
                </div>
            </React.Fragment>
        );
    }
}

export default ExtensionLibrary;