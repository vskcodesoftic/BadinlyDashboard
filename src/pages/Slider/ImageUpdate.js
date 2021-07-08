/* eslint-disable */

import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

import Loader from "react-js-loader";

import './style.css';

class ImageUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            description: '',
            spinner: false

        };
    }
    onChange = (e) => {
        if (e.target.type === 'file') {
            // Assuming only image
            let file = this.refs.image.files[0];
            let reader = new FileReader();
            let url = reader.readAsDataURL(file);

            reader.onloadend = (e) => {
                this.setState({imageUrl: [reader.result], image: file});
            };
        }

        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('description', this.state.description);
        formData.append('title', this.state.title);
        this.setState({spinner : true})

        // still to resolve promise
        axios
            .post('https://badilnyint.com/api/admin/banner/addImages', formData)
            .then((res) => {
                console.log(res.data);
                this.setState({spinner : false})
                toast.success(`image uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    render() {
        const {imageUrl, description, title} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-sm-6  form-wrapper">
                        <div className="login-box">
                            <div className="card card-outline card-primary">
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="profile-div">
                                            {this.state.imageUrl ? (
                                                <div className="col-12 col-sm-4">
                                                    <img
                                                        width="50%"
                                                        src={imageUrl}
                                                        onClick={() =>
                                                            this.refs.image.click()
                                                        }
                                                        className="img-placeholder form-control"
                                                        alt=""
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="img-placeholder"
                                                    onClick={() =>
                                                        this.refs.image.click()
                                                    }
                                                ></div>
                                            )}
                                            <p><b>Image</b>*</p>
                                            <input
                                                type="file"
                                                ref="image"
                                                onChange={this.onChange}
                                                className="hidden"
                                                required
                                            />                                         
                                        </div>

                                        <div className="form-group">
                                            <label className="label ">
                                            <p>Title*</p>
                                            </label>
                                            <input
                                                name="title"
                                                value={title}
                                                onChange={this.onChange}
                                                className="form-control"
                                                required

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="label ">
                                            <p>Description*</p>
                                            </label>
                                            <input
                                                name="description"
                                                value={description}
                                                onChange={this.onChange}
                                                className="form-control"
                                                required

                                            />
                                        </div>

                                                {this.state.spinner ? ( 
                                        <Loader type="bubble-top"
                                        className="mt-5"
                                        bgColor={"#000000"}
                                            title={"...loading"} size={100} /> 
                                            ) : null }
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                            >
                                                Upload Slider Images
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageUpdate;
