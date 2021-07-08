/* eslint-disable */
import React, {Component} from 'react';
import Loader from "react-js-loader";

import axios from 'axios';
import {toast} from 'react-toastify';

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
            .post('https://badilnyint.com/api/admin/adds/addImages', formData)
            .then((res) => {
               
                console.log(res.data);
                toast.success(`image uploaded  sucessfully !`);
                this.setState({spinner : false})

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
                                            className="img-placeholder"
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="img-placeholder"
                                        onClick={() => this.refs.image.click()}
                                    ></div>
                                )}
                                <b><span>Image*</span></b>
                                <input
                                    required
                                    type="file"
                                    ref="image"
                                    onChange={this.onChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="form-group">
                                <label className="label ">Title*</label>
                                <input
                                    required
                                    name="title"
                                    value={title}
                                    onChange={this.onChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label ">description</label>
                                <input
                                    name="description"
                                    value={description}
                                    onChange={this.onChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                          
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Upload Advertisement Images
                                </button>
                            </div>
                        
                        </form>

                            {this.state.spinner ? ( 
                      <Loader type="bubble-top"
                      className="mt-5"
                       bgColor={"#000000"}
                        title={"...loading"} size={100} /> 
                        ) : null }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageUpdate;
