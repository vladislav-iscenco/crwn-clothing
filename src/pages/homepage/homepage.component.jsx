import React from 'react';

import Directory from '../../components/directory/directory.component'
import {withRouter} from 'react-router-dom'


import './homepage.styles.scss';

const HomePage = () => (
    <div className="homepage">
        <Directory />
    </div>
);

export default withRouter(HomePage);