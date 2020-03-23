import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import './Dashboard.css';

const IntroductionCard = () => {
    return (
        <div className="welcome-card">
            <Card>
                <CardHeader
                    title={'use this card to tell teachers how to do stuff'}
                    subtitle={'found in Dashboard/IntroductionCard.js'}
                />
            </Card>
        </div>
    );
};

export default IntroductionCard;
