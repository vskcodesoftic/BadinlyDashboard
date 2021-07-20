/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const getVendorsCount = () => {
    const api = axios.create({
        baseURL: `https://badilnyint.com`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('/api/user/getVendorsCount')
            .then((res) => {
                setData(res.data.vendors);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data ? data : 0}</>;
};

export default getVendorsCount;
