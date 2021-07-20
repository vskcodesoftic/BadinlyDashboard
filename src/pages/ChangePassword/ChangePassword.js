/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import Loader from 'react-js-loader';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';

const refreshPage = () => {
    window.location.reload();
};



const ChangePasswordPage = (props) => {
    // const {userId, title ,description,category,subcategory,status,quantity,isShow,isFeatured,image} = props;
    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [spinner, setspinner] = useState(false);
    const [t] = useTranslation();
    const fileInput = React.createRef('');
    const [FileInupt, setFileInupt] = useState('');

    const [Redirect, setRedirect] = useState(false);

    const [Data, setData] = useState('');

    const onSubmit = (data) => {
        // still to resolve promise
     
        if (data.newpassword !== data.newpassword1) {
            alert("Passwords don't match");
        } else {
            // make API call
        }
        const fd = new FormData();

        setspinner(true);

        axios
            .post('https://badilnyint.com/api/admin/changePassword', data)
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem("token");
                toast.success(`Password updated sucessfully !`);
                refreshPage()

            })
            .catch((error) => {
                console.log('Error', error);
                toast.error(`something went wrong, could not update password`);
                setspinner(false);
                setRedirect(false);
            });
    };

    if (Redirect) {
        return <Redirect to="/login" />;
    }
    return (
        <div>
            <div>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="Field-group mb-3">
                                    <p>Email *</p>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: true
                                        })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                    <p>Old Password*</p>
                                    <input
                                        type="password"
                                        {...register('oldpassword', {
                                            required: true
                                        })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                    <p>New Password*</p>
                                    <input
                                        type="password"
                                        {...register('newpassword', {
                                            required: true
                                        })}
                                        className="form-control"
                                    />
                                </div>

                                <div className="Field-group mb-3">
                                    <p>Confirm Password*</p>
                                    <input
                                        type="password"
                                        {...register('newpassword1', {
                                            required: true
                                        })}
                                        className="form-control"
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            ChangePassword
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {spinner ? (
                                <Loader
                                    type="bubble-top"
                                    className="mt-5"
                                    bgColor={'#000000'}
                                    title={'...loading'}
                                    size={100}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
