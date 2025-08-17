import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import './lib/dark-mode.js';

import GUI from './containers/gui.jsx';

ReactDOM.render(
    <IntlProvider locale={"en"} messages={{}}>
        <GUI />
    </IntlProvider>,
    document.getElementById('root')
)