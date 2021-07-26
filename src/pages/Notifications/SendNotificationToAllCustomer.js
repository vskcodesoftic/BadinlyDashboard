/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Input from '@app/../node_modules/reactstrap/es/Input';
import Select from 'react-select';
import Loader from 'react-js-loader';
import {Redirect} from 'react-router-dom';

const refreshPage = () => {
    window.location.reload();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const SendNotificationToAllCustomer = (props) => {
    const items = [];
    let SubCategoriesFound = [];
    let SubCategoryObjectValues = [];
    let SubCategoryLength;
    let superText;
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    let selectedValue;
    const [Category, setCategory] = useState([]);
    const [QueryCategory, SetQueryCategory] = useState([]);
    const [SubCategory, setSubCategory] = useState([]);
    const [Spinner, setSpinner] = useState(false);

    const [redirect, setredirect] = useState(false);

    const [FilteredSubCat, setFilteredSubCat] = useState([]);
    const [FiltredSubLen, setFiltredSubLen] = useState('');

    const [
        selectedCategoryFromDropDown,
        setselectedCategoryFromDropDown
    ] = useState('');

    let finalArray = [];
    const numbers = [1, 2, 3, 4, 5];

    const api = axios.create({
        baseURL: `https://badilnyint.com/`
    });

    const MakeItem = function (value) {
        return (
            <>
                <option key={value} value={value}>
                    {value}
                </option>
            </>
        );
    };

    //useedddjvvjvv
    useEffect(() => {
        axios
            .get(
                `https://badilnyint.com/api/admin/getSubs?CId=${selectedCategoryFromDropDown}`
            )
            .then((res) => {
                // //SubCategoriesFound is an array

                // const c = res.data.SubCategories[0]
                // SubCategoriesFound =res.data.SubCategories[0]

                // SubCategoryLength = SubCategoriesFound.length

                // console.log("c",c)
                // console.log("cz",SubCategoriesFound)
                // console.log("czlen", SubCategoryLength)

                // const objectArray =  Object.entries(SubCategoriesFound[0]);

                // objectArray.forEach(async ([key, value]) => {
                // console.log("key is h:",key); // 'one'
                // const subArry = value;
                //  SubCategoryObjectValues = subArry

                // console.log("values k:",SubCategoryObjectValues); // 1

                // });

                //FilterDataCopy()

                setSubCategory(res.data.SubCategories);
                //let subs ;
                //console.log(res.data)

                //console.log("gggg",SubCategory)
                // const result =  Object.values(res.data.SubCategories);
                //  setSubCategory(result)

                // subs =  res.data.SubCategories

                // const objectArray =  Object.entries(SubCategory[0]);

                // objectArray.forEach(async ([key, value]) => {
                // console.log("key is h:",key); // 'one'
                // const subArry = value.subcategory;
                //  setFilteredSubCat(subArry)
                // const subArryLen = subArry.length;

                //  setFiltredSubLen(subArryLen)
                // console.log("values k:",FilteredSubCat, FiltredSubLen); // 1

                // });
            })

            .catch((err) => {
                console.error(err);
            });
        // do stuff
        //console.log("cccccc",selectedCategoryFromDropDown);
    }, [selectedCategoryFromDropDown]);

    useEffect(() => {
        axios
            .get('https://badilnyint.com/api/user/getListOfCustomers')
            .then((res) => {
                //console.log("cats",res.data.Categories[0])

                const cats = res.data.users;

                const objectArray = Object.entries(cats);

                console.log('intial selected values', objectArray);

                setCategory(objectArray);

                setselectedCategoryFromDropDown(intialDropdownValue);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // const myFunction  = async (value, index, array) => {
    //     //<p key={index}>hello{value}, {array[index]}</p>
    //     //superText += value ;
    //     //txt += "<li>" + value + "</li>";
    //     // let fLen = array.length;
    //     let z = Object.values(popArray)
    //     superText+= "<li>" + value + "</li>"
    //     superArray.push(value)

    //     // let newz = popArray[0]
    //     // let zlen = await newz;

    //     // console.log("object values",newz)
    //     // console.log("type is newz",typeof newz);
    //     // console.log("new z length :",fLen)
    //     // console.log("type is z",typeof z);

    //     console.log("type of numbers", typeof numbers)

    //     z.forEach((element) => {

    //        // txt += element[index] + "<br>";

    //           console.log("ghh",element)

    //           document.getElementById("demo").innerHTML = element ;
    //           console.log("element is",element)
    //           items.push(<p key={index}>{element}</p>)
    //          items.push(element)
    //          console.log(typeof items)

    //     });

    //   }

    // useEffect(() => {
    // //    console.log("finalArray mount",finalArray)
    // //    console.log("type is",typeof numbers);
    //    console.log("type is",typeof popArray);

    //    popArray.forEach(myFunction);
    //    text = superText;
    //    //console.log("text",text)
    // }, [finalArray])

    //   const subData = async () => {
    //     axios.get(`http://localhost:8001/api/admin/getSubs?CId=mobiles`)
    //     .then(async(res) => {
    //         let subs ;
    //         console.log(res.data)
    //         const result = await Object.values(res.data.SubCategories);
    //         await setSubCategory(result)

    //         subs = await res.data.SubCategories

    //         const objectArray = await Object.entries(SubCategory[0]);

    //         objectArray.forEach(async ([key, value]) => {
    //         console.log("key:",key); // 'one'
    //         const subArry = value.subcategory;
    //         await setFilteredSubCat(subArry)
    //         const subArryLen = subArry.length;

    //         await setFiltredSubLen(subArryLen)
    //         console.log("values:",FilteredSubCat, FiltredSubLen); // 1

    //         });

    //             })
    //             .catch(err => {
    //                 console.error(err);
    //             })
    //   }

    //    const dropHandler = async (e) => {

    //    }

    console.log(Category);

    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();

    const onSubmit = async (data) => {
        await sleep(20);
        api.post('/api/trade/firebase/SendNotificationToUsers', data)
            .then((res) => {
                console.log(res.data);
                toast.success(`notification response sent sucessfully !`);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
                setIserror(true);
                setErrorMessages([`Update failed! Server error${error}`]);
            });
    };

    if (redirect) {
        return <Redirect to="/products" />;
    }
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="login-box">
                            <div className="card card-outline card-primary">
                                <h6 className="mb-3 mt-3 m-2 text-center">
                                    Send Message to All Customer
                                </h6>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="Field-group mb-3">
                                            <p>Message*</p>
                                            <textarea
                                                rows="4"
                                                cols="50"
                                                {...register('msgToUser', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="message"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {t(
                                                        'notification.sendUserSpecficNotifaction'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SendNotificationToAllCustomer;
