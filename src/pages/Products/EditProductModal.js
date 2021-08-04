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

const EditProdutModal = (props) => {
    const {
        userId,
        title,
        description,
        category,
        subcategory,
        status,
        quantity,
        isShow,
        isFeatured,
        image,
        reccomendedSubCategoryOfProduct,
        recommedCateogyOfProduct
    } = props;

    const [recomdendSubcategory, setrecomdendSubcategory] = useState([]);
    const [RecSubCategory, setRecSubCategory] = useState([]);

    let finalSubArray = [];

    const [
        selectedRecommdedCategoryFromDropDown,
        setselectedRecommdedCategoryFromDropDown
    ] = useState('');

    const {register, handleSubmit} = useForm({
        defaultValues: {
            title: `${title}`,
            description: `${description}`,
            status: `${status}`,
            quantity: `${quantity}`,
            category: `${category}`,
            // subcategory: `${subcategory}`,
            image: `${image}`,
            isShow: `${isShow}`,
            recommendSubcategory: `${reccomendedSubCategoryOfProduct}`,
            recommendCategory: `${recommedCateogyOfProduct}`
        }
    });

    const items = [];
    let SubCategoriesFound = [];
    let SubCategoryObjectValues = [];
    let SubCategoryLength;
    let superText;

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

    const [ImageValue, setImageValue] = useState('');
    const [spinner, setspinner] = useState(false);
    const [t] = useTranslation();
    const fileInput = React.createRef('');
    const [FileInupt, setFileInupt] = useState('');

    const [Data, setData] = useState('');

    const MakeItem = function (value) {
        return (
            <>
                <option key={value} value={value}>
                    {value}
                </option>
            </>
        );
    };

    console.log('subcs', subcategory);

    useEffect(() => {
        axios
            .get('https://badilnyint.com/api/admin/getCats')
            .then((res) => {
                //console.log("cats",res.data.Categories[0])

                const cats = res.data.Categories;

                const objectArray = Object.entries(cats[0]);

                const intialCategory = objectArray[0];

                const intialValues = Object.values(intialCategory);

                const intialDropdownValue = intialValues[1].category;

                console.log('intial selected values', intialDropdownValue);

                setCategory(res.data.Categories);

                setselectedCategoryFromDropDown(category);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    //useedddjvvjvv
    useEffect(() => {
        axios
            .get(
                `https://badilnyint.com/api/admin/getSubs?CId=${selectedCategoryFromDropDown}`
            )
            .then((res) => {
                setSubCategory(res.data.SubCategories);
            })

            .catch((err) => {
                console.error(err);
            });
    }, [selectedCategoryFromDropDown]);

    //recommended sub category fetch
    useEffect(() => {
        axios
            .get(
                `https://badilnyint.com/api/admin/getSubs?CId=${selectedRecommdedCategoryFromDropDown}`
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

                setRecSubCategory(res.data.SubCategories);
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
    }, [selectedRecommdedCategoryFromDropDown]);

    console.log(Category);

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

        setspinner(true);

        axios
            .patch(`https://badilnyint.com/api/product/${userId}`, fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`Product updated sucessfully !`);
                setspinner(false);
                refreshPage();
            })
            .catch((error) => {
                console.log('Error');
            });
    };
    if (redirect) {
        return <Redirect to="/products" />;
    }
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
                                    <p>Category*</p>
                                    {Object.keys(Category).map((item, i) => (
                                        <select
                                            key={i}
                                            {...register('category')}
                                            className="form-control"
                                            onChange={(e) => {
                                                selectedValue = e.target.value;
                                                console.log(selectedValue);
                                                setselectedCategoryFromDropDown(
                                                    e.target.value
                                                );
                                                //   dropHandler(e)
                                                //{FilterDataCopy()}
                                            }}
                                            className="form-control"
                                            placeholder="Category"
                                        >
                                            {Category[i].map((c, i) => (
                                                <>
                                                    <option
                                                        key={i}
                                                        value={c.category}
                                                    >
                                                        {c.category}
                                                    </option>
                                                </>
                                            ))}
                                        </select>
                                    ))}
                                </div>
                                <div className="Field-group mb-3">
                                    <p>SubCategory*</p>

                                    {Object.entries(SubCategory).map(
                                        (item, i) => (
                                            <select
                                                key={items}
                                                {...register('subcategory', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="subcategory"
                                            >
                                                {SubCategory[i].map((c, ix) => {
                                                    let clen =
                                                        c.subcategory.length;
                                                    for (
                                                        let index = ix;
                                                        index < clen;
                                                        index++
                                                    ) {
                                                        const element =
                                                            c.subcategory;
                                                        console.log(
                                                            index,
                                                            clen,
                                                            element[index]
                                                        );

                                                        finalArray.push(
                                                            element[index]
                                                        );
                                                    }
                                                })}

                                                {finalArray.map(MakeItem)}
                                            </select>
                                        )
                                    )}
                                </div>

                                <div className="Field-group mb-3">
                                    <p>RecommendCategory*</p>
                                    {Object.keys(Category).map((item, i) => (
                                        <select
                                            key={i}
                                            {...register('recommendCategory')}
                                            className="form-control"
                                            onChange={(e) => {
                                                selectedValue = e.target.value;
                                                console.log(selectedValue);
                                                setselectedRecommdedCategoryFromDropDown(
                                                    e.target.value
                                                );
                                                //   dropHandler(e)
                                                //{FilterDataCopy()}
                                            }}
                                            className="form-control"
                                            placeholder="recommendCategory"
                                        >
                                            {Category[i].map((c, i) => (
                                                <>
                                                    <option
                                                        key={i}
                                                        value={c.category}
                                                    >
                                                        {c.category}
                                                    </option>
                                                </>
                                            ))}
                                        </select>
                                    ))}
                                </div>

                                <div className="Field-group mb-3">
                                    <p>RecommendedSubCategory*</p>

                                    {Object.entries(RecSubCategory).map(
                                        (item, i) => (
                                            <select
                                                key={items}
                                                {...register(
                                                    'recommendSubcategory',
                                                    {
                                                        required: true
                                                    }
                                                )}
                                                className="form-control"
                                            >
                                                {RecSubCategory[i].map(
                                                    (c, ix) => {
                                                        let clen =
                                                            c.subcategory
                                                                .length;
                                                        for (
                                                            let index = ix;
                                                            index < clen;
                                                            index++
                                                        ) {
                                                            const element =
                                                                c.subcategory;
                                                            console.log(
                                                                index,
                                                                clen,
                                                                element[index]
                                                            );

                                                            finalSubArray.push(
                                                                element[index]
                                                            );
                                                        }
                                                    }
                                                )}

                                                {finalSubArray.map(MakeItem)}
                                            </select>
                                        )
                                    )}
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
                                        <option value="false">false</option>
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
                                            Update Product
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {spinner ? (
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
        </div>
    );
};

export default EditProdutModal;
