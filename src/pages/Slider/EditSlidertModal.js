/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Loader from 'react-js-loader';

const refreshPage = () => {
    window.location.reload();
};

const EditSlidertModal = (props) => {
    const {userId, title, description, image} = props;
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userId: `${userId}`,
            title: `${title}`,
            description: `${description}`,
            image: `${image}`
        }
    });
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    const [Data, setData] = useState([]);
    const [Spinner, setSpinner] = useState(false);
    console.log(title);

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

        setSpinner(true);

        axios
            .patch(`https://badilnyint.com/api/admin/baneer/b/${userId}`, fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`Slider updated sucessfully !`);
                setSpinner(false);
                refreshPage();
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
                            {/* { Object.keys(Data).map((item, i) => (
                                <div key={i} className="report">
                                    <p>{item}</p>
                                    {Data[item].map((media,ind) =>
                                        <div key={ind}><p>{media.title}</p></div>
                                    )}
                                </div>
                        ))} */}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="Field-group mb-3">
                                    <p>Title</p>

                                    <input
                                        {...register('title', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={title}
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
                                    <p>Image*</p>

                                    <input
                                        required
                                        multiple
                                        ref={fileInput}
                                        type="file"
                                        className="form-control"
                                        placeholder={description}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            {t('slider.addImage')}
                                        </button>
                                    </div>
                                </div>
                                {Spinner ? (
                                    <Loader
                                        type="spinner-circle"
                                        className="mt-5"
                                        bgColor={'#000000'}
                                        title={'...loading'}
                                        size={50}
                                    />
                                ) : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSlidertModal;
