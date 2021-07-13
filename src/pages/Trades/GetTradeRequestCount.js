/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const GetTradeRequestCount = () => {
    const api = axios.create({
        baseURL: `http://localhost:8002`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('/api/trade/getTradeRequestTradesCount')
            .then((res) => {
                setData(res.data.trades);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data}</>;
};

export default GetTradeRequestCount;
