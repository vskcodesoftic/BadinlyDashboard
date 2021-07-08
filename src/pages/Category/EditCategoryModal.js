/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';

const EditCategoryModal = (props) => {
    const {userId, title ,description,category,subcategory,status,quantity,isShow,isFeatured,image} = props;
    const {register, handleSubmit} = useForm({
        defaultValues: {
            category: `${category}`,
            subcategory: `${subcategory}`
        }
      });
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    const [Data, setData] = useState('');

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
            .patch(
                `https://badilnyint.com/api/admin/category/addSubCategory/${userId}`,
                data
            )
            .then((res) => {
                console.log(res.data);
                toast.success(`category sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    return (
        <div>
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
                                        placeholder={category}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                    <input
                                        {...register('subcategory', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={subcategory}
                                
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            {t('category.updateCategory')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;
