import React from 'react';

import Directory from '../../components/directory/directory.component'
import { withRouter } from 'react-router-dom'

import { HomepageContainer } from './homepage.styles';

const HomePage = () => (
    <HomepageContainer>
        <Directory />
    </HomepageContainer>
);

export default withRouter(HomePage);