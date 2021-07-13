/* eslint-disable */

import {SmallBox} from '@app/components/index';
import React from 'react';
import GetFeauturedProductsCount from './GetFeauturedProductsCount';
import GetProductsCount from './GetProductsCount';

const ProductsHeader = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-6 col-6">
                    <SmallBox
                        count={<GetProductsCount />}
                        title="No of Products"
                        type="info"
                        icon="ion-android-people"
                    />
                </div>
                <div className="col-lg-6 col-6">
                    <SmallBox
                        count={<GetFeauturedProductsCount />}
                        title="Feautured Products"
                        icon="ion-bag"
                        type="warning"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsHeader;
