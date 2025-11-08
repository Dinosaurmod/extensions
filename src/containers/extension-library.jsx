import PropTypes from 'prop-types';
import React from 'react';
import {intlShape} from 'react-intl';
import classNames from 'classnames';

import LibraryItem from '../components/library-item/library-item.jsx';
import Gap from './gap.jsx';

import extensionsData from '../extensions.jsx';

class ExtensionLibrary extends React.Component {
    render () {
        const {
            ...props
        } = this.props;

        const extensionNodes = [];
        const jokeExtensionNodes = [];

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
        extensionsData[1].forEach(item => {
            jokeExtensionNodes.push(
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
                <Gap size="10px" />
                <h1>Joke / Livetests Extensions</h1>
                <Gap size="10px" />
                <div className="extension-library">
                    {jokeExtensionNodes}
                </div>
            </React.Fragment>
        );
    }
}

export default ExtensionLibrary;