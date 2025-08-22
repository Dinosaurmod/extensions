import React from 'react';

import defaultExtensionIcon from './icons/placeholder.png';

import dmPythonIcon from './icons/python.png';
import dmLuaIcon from './icons/lua.png';

const menuItems = [
    {
        name: 'Site Runtime',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/webextension.js',
        iconURL: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/images/site-runtime.png',
        description: 'A Combined version of multiple extensions: Packager Applications & AdaBrowser',
        featured: true,
        extDeveloper: 'MrIncredibleMaker',
        internetConnectionRequired: true,
        disabled: false
    },
    {
        name: 'Typable Tab Key',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/typable-tab-character.js',
        iconURL: defaultExtensionIcon,
        description: 'Gives the ability of typing the tab character.',
        featured: true
    },
    {
        name: 'GitHub API',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/github-api.js',
        iconURL: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/images/githubapi.png',
        description: 'Fetch IDs, Description, etc. from Repositories, Users and Organizations.',
        internetConnectionRequired: true,
        featured: true
    },
    {
        name: 'Python',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/python.js',
        iconURL: dmPythonIcon,
        description: 'Run your own custom code written in Python using Pyodide!',
        credits: ['Pyodide'],
        featured: true
    },
    {
        name: 'Lua',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/lua.js',
        iconURL: dmLuaIcon,
        description: 'Run your own custom code written in Lua using Fengari!',
        credits: ['Fengari'],
        featured: true
    },
    {
        name: 'Useless blocks',
        extensionId: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/extensions/Useless_Blocks.js',
        iconURL: 'https://gabsthecuriouskid.github.io/DinosaurModExtensions/images/Useless_Blocks.png',
        description: '',
        extDevHREF: {
            name: "Jambs",
            href: "https://www.youtube.com/channel/UCJzRC3HsauioZoc9vKC6W4g"
        },
        featured: true
    },
];

export default menuItems;