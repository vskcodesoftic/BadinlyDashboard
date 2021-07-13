/* eslint-disable */

import {SmallBox} from '@app/components/index';
import GetConfirmedTradesCount from './GetConfirmedTradesCount';
import React from 'react';
import GetTradeRequestCount from '@app/pages/Trades/GetTradeRequestCount';
import GetDeclinedTradesCount from '@app/pages/Trades/GetDeclinedTradesCount';

const TradesHeader = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetTradeRequestCount />}
                        title="Trade Requests"
                        type="info"
                        icon="ion-android-people"
                    />
                </div>
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetConfirmedTradesCount />}
                        title="Confirmed Trades "
                        icon="ion-bag"
                        type="warning"
                    />
                </div>
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetDeclinedTradesCount />}
                        title="Declined Trades "
                        icon="ion-bag"
                        type="danger"
                    />
                </div>
            </div>
        </div>
    );
};

export default TradesHeader;
