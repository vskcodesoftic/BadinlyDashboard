/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import Loader from "react-js-loader";
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';




const EditProdutModal = (props) => {
    const {userId, title ,description,category,subcategory,status,quantity,isShow,isFeatured,image} = props;
    const {register, handleSubmit} = useForm({
        defaultValues: {
            title: `${title}`,
            description : `${description}`,
            status: `${status}`,
            quantity :`${quantity}`,
            category: `${category}`,
            subcategory: `${subcategory}`,
            image : `${image}`,
            isShow : `${isShow}`
        }
    });
    const [ImageValue, setImageValue] = useState('');
    const [spinner, setspinner] = useState(false)
    const [t] = useTranslation();
    const fileInput = React.createRef('');
    const [FileInupt, setFileInupt] = useState('')
     
    
     
    const [Data, setData] = useState('');
    

    const onSubmit = (data) => {
        // still to resolve promise
        console.log(
            'onSubmitFn:',
            data,
            '  imageFile: ',
            fileInput.current.files[0].name
        );
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]); // formdata doesn't take objects
        }

        fd.append(
            'image',
            fileInput.current.files[0],
            fileInput.current.files[0].name
        );
   
        setspinner(true)

        axios
            .patch(`https://badilnyint.com/api/product/${userId}`, fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`Product updated sucessfully !`);
                setspinner(false)

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
                                <p>Title</p>
                                    <input
                                        {...register('title', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder= {title}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                <p>Description</p>
                                    <input
                                        {...register('description', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={description}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                <p>Category</p>
                                    <input
                                        {...register('category', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={category}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                <p>SubCategory</p>
                                    <input
                                        {...register('subcategory', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={subcategory}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                <p>Image*</p>
                                    <input
                                       required
                                        multiple
                                        ref={fileInput}
                                        type="file"
                                        className="form-control"
                                        placeholder="Please choose Image"
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                <p>isFeatured</p>
                                    <select
                                        className="form-control"
                                        {...register('isFeatured', {
                                            required: true
                                        })}
                                    >   
                                        <p>{isFeatured}</p>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                                <div className="Field-group mb-3">
                                <p>Status</p>
                                    <select
                                        className="form-control"
                                        {...register('status', {
                                            required: true
                                        })}
                                    >
                                        <option value="active">active</option>
                                        <option value="inactive">
                                            inactive
                                        </option>
                                    </select>
                                </div>
                                <div className="Field-group mb-3">
                                <p>Visibility</p>
                                    <select
                                        className="form-control"
                                        {...register('isShow', {
                                            required: true
                                        })}
                                    >
                                        <option value="true">true</option>
                                        <option value="false">
                                            false
                                        </option>
                                    </select>
                                </div>
                                <div className="Field-group mb-3">
                                <p>Quantity</p>
                                    <input
                                    type="number"
                                        {...register('quantity', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={quantity}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            {t('product.addProduct')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {spinner ? ( 
                                        <Loader type="bubble-top"
                                        className="mt-5"
                                        bgColor={"#000000"}
                                            title={"...loading"} size={100} /> 
                                            ) : null }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProdutModal;
