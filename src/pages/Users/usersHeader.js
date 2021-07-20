/* eslint-disable */

import {SmallBox} from '@app/components/index';
import GetUsersCount from '../../pages/GetUsersCount';
import React from 'react';
import GetCustomerCount from './getCustomerCount';
import GetVendorsCount from './getVendorsCount';

const UsersHeader = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetUsersCount />}
                        title="No of Users"
                        type="info"
                        icon="ion-android-people"
                    />
                </div>
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetCustomerCount />}
                        title="No of Customers"
                        type="danger"
                        icon="ion-android-people"
                    />
                </div>
                <div className="col-lg-4 col-4">
                    <SmallBox
                        count={<GetVendorsCount />}
                        title="No of Vendors"
                        icon="ion-bag"
                        type="warning"
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersHeader;
