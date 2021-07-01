/* eslint-disable */
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Input from '@app/../node_modules/reactstrap/es/Input';

const AddCategoryPage = (props) => {
    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();

    const onSubmit = (data) => {
        // still to resolve promise

        // console.log(
        //     'onSubmitFn:',
        //     data,
        //     '  imageFile: ',
        //     fileInput.current.files[0].name
        // );
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]); // formdata doesn't take objects
        }

        // fd.append(
        //     'image',
        //     fileInput.current.files[0],
        //     fileInput.current.files[0].name
        // );

        axios
            .post('http://localhost:8001/api/admin/category/addCategory', data)
            .then((res) => {
                console.log(res.data);
                toast.success(`Category uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="login-box">
                            <div className="card card-outline card-primary">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('category', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Category"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('subcategory[]', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="subcategory"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {t('category.addCategory')}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddCategoryPage;
