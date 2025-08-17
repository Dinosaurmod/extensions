import {FormattedMessage, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import './library-item.css';
import classNames from 'classnames';

import bluetoothIconURL from './bluetooth.svg';
import internetConnectionIconURL from './internet-connection.svg';

/* eslint-disable react/prefer-stateless-function */
class LibraryItemComponent extends React.PureComponent {
    render () {
        return (
            <div
                className={classNames(
                    "libraryItem",
                    "featuredItem",
                    {
                        ["disabled"]: this.props.disabled
                    },
                    typeof this.props.extensionId === 'string' ? "libraryItemExtension" : null,
                    this.props.hidden ? "hidden" : null
                )}
                onClick={this.props.onClick}
            >
                <div className={"featuredImageContainer"}>
                    {this.props.disabled ? (
                        <div className={"comingSoonText"}>
                            <FormattedMessage
                                defaultMessage="Coming Soon"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.comingSoon"
                            />
                        </div>
                    ) : null}
                    <img
                        className={"featuredImage"}
                        loading="lazy"
                        draggable={false}
                        src={this.props.iconURL}
                    />
                </div>
                {this.props.insetIconURL ? (
                    <div className={"libraryItemInsetImageContainer"}>
                        <img
                            className={"libraryItemInsetImage"}
                            src={this.props.insetIconURL}
                            draggable={false}
                        />
                    </div>
                ) : null}
                <div
                    className={typeof this.props.extensionId === 'string' ?
                        classNames("featuredExtensionText", "featuredText") : "featuredText"
                    }
                >
                    <span className={"libraryItemName"}>{this.props.name}</span>
                    <br />
                    <span className={"featuredDescription"}>{this.props.description}</span>
                </div>

                {(this.props.docsURI || this.props.samples) && (
                    <div className={"extensionLinks"}>
                        {this.props.docsURI && (
                            <a
                                href={this.props.docsURI}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FormattedMessage
                                    defaultMessage="Documentation"
                                    // eslint-disable-next-line max-len
                                    description="Appears in the extension list. Links to additional extension documentation."
                                    id="tw.documentation"
                                />
                            </a>
                        )}

                        {this.props.samples && (
                            <a
                                href={this.props.samples[0].href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FormattedMessage
                                    defaultMessage="Sample project"
                                    // eslint-disable-next-line max-len
                                    description="Appears in the extension list. Links to a sample project for an extension."
                                    id="tw.sample"
                                />
                            </a>
                        )}
                    </div>
                )}

                {this.props.credits && this.props.credits.length > 0 && (
                    <div className={"featuredExtensionCollaboration"}>
                        <div>
                            <FormattedMessage
                                defaultMessage="Credits to:"
                                description="Appears in the extension list. Followed by a list of names."
                                id="tw.createdBy"
                            />
                            {' '}
                            {this.props.credits.map((credit, index) => (
                                <React.Fragment key={index}>
                                    {credit}
                                    {index !== this.props.credits.length - 1 && (
                                        ', '
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {this.props.bluetoothRequired || this.props.internetConnectionRequired || this.props.collaborator ? (
                    <div className={"featuredExtensionMetadata"}>
                        <div className={"featuredExtensionRequirement"}>
                            {this.props.bluetoothRequired || this.props.internetConnectionRequired ? (
                                <div>
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Requires"
                                            description="Label for extension hardware requirements"
                                            id="gui.extensionLibrary.requires"
                                        />
                                    </div>
                                    <div
                                        className={"featuredExtensionMetadataDetail"}
                                    >
                                        {this.props.bluetoothRequired ? (
                                            <img src={bluetoothIconURL} />
                                        ) : null}
                                        {this.props.internetConnectionRequired ? (
                                            <img src={internetConnectionIconURL} />
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className={"featuredExtensionCollaboration"}>
                            {this.props.collaborator ? (
                                <div>
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Collaboration with"
                                            description="Label for extension collaboration"
                                            id="gui.extensionLibrary.collaboration"
                                        />
                                    </div>
                                    <div
                                        className={"featuredExtensionMetadataDetail"}
                                    >
                                        {this.props.collaborator}
                                    </div>
                                </div>
                            ) : null}
                            {this.props.extDeveloper ? (
                                <div>
                                    <div>
                                        Created by
                                    </div>
                                    <div
                                        className={"featuredExtensionMetadataDetail"}
                                    >
                                        {this.props.extDeveloper}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
/* eslint-enable react/prefer-stateless-function */


LibraryItemComponent.propTypes = {
    intl: intlShape,
    bluetoothRequired: PropTypes.bool,
    collaborator: PropTypes.string,
    extDeveloper: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    extensionId: PropTypes.string,
    featured: PropTypes.bool,
    hidden: PropTypes.bool,
    iconURL: PropTypes.string,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    credits: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])),
    docsURI: PropTypes.string,
    samples: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string
    })),
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired
};

LibraryItemComponent.defaultProps = {
    disabled: false
};

export default LibraryItemComponent;