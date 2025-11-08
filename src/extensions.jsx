import React from 'react';

import defaultExtensionIcon from './icons/placeholder.png';

import dmPythonIcon from './icons/python.png';
import dmLuaIcon from './icons/lua.png';

const extensionUrl = "https://raw.githubusercontent.com/Dinosaurmod/extensions/refs/heads/main/src/extensions/";
const legacyExtensionUrl = "https://gabsthecuriouskid.github.io/DinosaurModExtensions/";

const menuItems = [
    {
        name: 'Site Runtime',
        extensionId: extensionUrl + 'webextension.js',
        iconURL: legacyExtensionUrl + 'images/site-runtime.png',
        description: 'A Combined version of multiple extensions: Packager Applications & AdaBrowser',
        featured: true,
        extDeveloper: 'MrIncredibleMaker',
        internetConnectionRequired: true,
        disabled: false
    },
    {
        name: 'Typable Tab Key',
        extensionId: extensionUrl + 'typable-tab-character.js',
        iconURL: defaultExtensionIcon,
        description: 'Gives the ability of typing the tab character.',
        extDeveloper: 'MrIncredibleMaker',
        featured: true
    },
    {
        name: 'GitHub API',
        extensionId: extensionUrl + 'github-api.js',
        iconURL: legacyExtensionUrl + 'images/githubapi.png',
        description: 'Fetch IDs, Description, etc. from Repositories, Users and Organizations.',
        internetConnectionRequired: true,
        extDeveloper: 'MrIncredibleMaker',
        featured: true
    },
    {
        name: 'Python',
        extensionId: extensionUrl + 'python.js',
        iconURL: dmPythonIcon,
        description: 'Run your own custom code written in Python using Pyodide!',
        credits: ['Pyodide'],
        extDeveloper: 'MrIncredibleMaker',
        internetConnectionRequired: true,
        featured: true
    },
    {
        name: 'Lua',
        extensionId: extensionUrl + 'lua.js',
        iconURL: dmLuaIcon,
        description: 'Run your own custom code written in Lua using Fengari!',
        credits: ['Fengari'],
        extDeveloper: 'MrIncredibleMaker',
        internetConnectionRequired: true,
        featured: true
    },
];

const jokeMenuItems = [
    {
        name: 'Useless blocks',
        extensionId: extensionUrl + 'Useless_Blocks.js',
        iconURL: legacyExtensionUrl + 'images/Useless_Blocks.png',
        description: '',
        extDevHREF: {
            name: "Jambs / jlgri",
            href: "https://www.youtube.com/channel/UCJzRC3HsauioZoc9vKC6W4g"
        },
        featured: true
    },
    {
        name: 'Dogs',
        extensionId: extensionUrl + 'DOGS.js',
        iconURL: defaultExtensionIcon,
        description: 'Blocks related to dogs.',
        featured: true,
        inspiredExt: 'G1nX\'s Cats Extension',
        extDeveloper: 'MrIncredibleMaker'
    },
    {
        name: 'Dinosaurmod\'s test extension',
        extensionId: extensionUrl + 'test.js',
        iconURL: defaultExtensionIcon,
        description: 'Dinosaurmod\'s own Test Extension to see what\'s possible or not. DON\'T USE THIS IN PRODUCTION as blocks can change and may corrupt your projects.',
        featured: true,
        extDeveloper: 'MrIncredibleMaker'
    },
];

export default [menuItems, jokeMenuItems];