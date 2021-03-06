/* eslint-disable */
import React from 'react';
import SmallBox from '../components/small-box/SmallBox';
import GetUsersCount from '@app/pages/GetUsersCount';
import GetProductsCount from '@app/pages/Products/GetProductsCount';
import GetFeauturedProductsCount from '@app/pages/Products/GetFeauturedProductsCount';
import GetPaymentsCount from '@app/pages/Payments/GetPaymentsCount';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetUsersCount />}
                        title="No of Users"
                        type="info"
                        icon="ion-android-people"
                        navigateTo="/users"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetProductsCount />}
                        title="No of Products"
                        type="success"
                        navigateTo="/products"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetFeauturedProductsCount />}
                        title="Feautured Products"
                        icon="ion-bag"
                        type="warning"
                        navigateTo="/products"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetPaymentsCount />}
                        title="No. of Payments"
                        type="danger"
                        icon="ion-cash"
                        navigateTo="/payments"
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <h1>hello</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
