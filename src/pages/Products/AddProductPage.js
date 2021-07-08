/* eslint-disable */
import React, {useState, useRef , useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Input from '@app/../node_modules/reactstrap/es/Input';
import Select from 'react-select'
import Loader from "react-js-loader";
import { Redirect } from "react-router-dom";

const refreshPage = ()=>{
    window.location.reload();
 }



export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const AddPrdouctPage = (props) => {
    const items = []
    let selectedValue;
   const [Category, setCategory] = useState([])
   const [QueryCategory , SetQueryCategory] = useState([])
   const [SubCategory, setSubCategory] = useState([])
    const [Spinner, setSpinner] = useState(false);

    const [redirect, setredirect] = useState(false)

   const [FilteredSubCat, setFilteredSubCat] = useState([])
   const [FiltredSubLen, setFiltredSubLen] = useState('')
    const api = axios.create({
        baseURL: `https://badilnyint.com/`
    });

  const FilterDataCopy = () => {
        for (let index = 0; index < FiltredSubLen; index++) {
            const element =  FilteredSubCat[index];
            console.log("element is",element)
             items.push(<option vlaue={element} key={index}>{element}</option>)

           
          
        }
      }

    
   useEffect(() => {
       
    axios.get('https://badilnyint.com/api/admin/getCats')
    .then(res => {
        console.log(res.data.Categories)
        setCategory(res.data.Categories)
    })
    .catch(err => {
        console.error(err); 
    })
            
        }, [])


  const subData = async () => {
    axios.get(`http://localhost:8001/api/admin/getSubs?CId=mobiles`)
    .then(async(res) => {
        let subs ;
        console.log(res.data)
        const result = await Object.values(res.data.SubCategories);
        await setSubCategory(result)
         
        subs = await res.data.SubCategories


        const objectArray = await Object.entries(SubCategory[0]);

        objectArray.forEach(async ([key, value]) => {
        console.log("key:",key); // 'one'
        const subArry = value.subcategory;
        await setFilteredSubCat(subArry)
        const subArryLen = subArry.length;
        
        await setFiltredSubLen(subArryLen)
        console.log("values:",FilteredSubCat, FiltredSubLen); // 1
        
        });

     
            
            })
            .catch(err => {
                console.error(err);
            })
  }

   const dropHandler = async (e) => {
       axios.get(`https://badilnyint.com/api/admin/getSubs?CId=${selectedValue}`)
       .then(res => {
           console.log(res.data.SubCategories)
           setSubCategory(res.data.SubCategories)
           let subs ;
           console.log(res.data)
           const result =  Object.values(res.data.SubCategories);
            setSubCategory(result)
            
           subs =  res.data.SubCategories
   
   
           const objectArray =  Object.entries(SubCategory[0]);
   
           objectArray.forEach(async ([key, value]) => {
           console.log("key is h:",key); // 'one'
           const subArry = value.subcategory;
            setFilteredSubCat(subArry)
           const subArryLen = subArry.length;
           
            setFiltredSubLen(subArryLen)
           console.log("values k:",FilteredSubCat, FiltredSubLen); // 1
           
           });

               
               })
   
       .catch(err => {
           console.error(err); 
       })
   }

     console.log(Category)

    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();

    const onSubmit = async  (data) => {
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

      await  fd.append(
            'image',
            fileInput.current.files[0],
            fileInput.current.files[0].name
        );
       setSpinner(true)
        api
            .post('/api/admin/postItem', fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`Product Added sucessfully !`);
                setSpinner(false)
                setredirect(true)
            })
            .catch((error) => {
                console.log(error);
                toast.error(`something went wrong`);
            });
    };

    if (redirect) {
        return <Redirect to='/products'/>;
      }

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
                                        <p>Title*</p>
                                            <input
                                                {...register('title', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="title"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                        <p>Descreption*</p>
                                            <input
                                                {...register('description', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Descreption"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                        <p>Category*</p>
                                              { Object.keys(Category).map((item, i) => (
                                                        <select key={i} 
                                                        {...register('category')}
                                                        className="form-control"
                                                        onChange={(e)=> {
                                                             selectedValue = e.target.value;
                                                              console.log(selectedValue)
                                                              dropHandler(e)
                                                              {FilterDataCopy()}

                                                            }
                                                        }
                                                        className="form-control"
                                                        placeholder="Category" >
                                                            {Category[i].map((c,i) =>
                                                            <>
                                                                <option key={i} value={c.category}>{c.category}</option>
                                                            </>
                                                            )}
                                                        </select>
                                                ))}
                                        </div>
                                        <div className="Field-group mb-3">
                                        <p>SubCategory*</p>

                                        {/* {Object.values(SubCategory).map((item, i) => (
                                                        <select key={item} 
                                                        {...register('subcategory')}
                                                        className="form-control"
                                                        placeholder="SuCategory" >
                                                            
                                                            {
                                                            
                                                            SubCategory[i].map((c,i) =>{
                                                                let clen = c.subcategory.length;
                                                                for (let index = 0; index < clen; index++) {
                                                                    const element = c.subcategory;
                                                                     console.log(index,clen, element[index])
                                                                     
                                                            return (
                                                            <> 
                                                                <option key={index}  value={element}>{element}</option>
                                                            </> )
                                                            }}
                                                            )}
                                                          

                                                        </select>
                                                ))} */}
                                               
                                               <input
                                                {...register('subcategory', {
                                                    required: true
                                                })}
                                          
                                                className="form-control"
                                                placeholder="Sub Category"
                                            />
                                        </div>
                                       
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('creator', {
                                                    required: true
                                                })}
                                                hidden
                                                value={GetCurrentUser().userId}
                                                className="form-control"
                                                placeholder="creator"
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
                                        <p>isFeatured*</p>
                                            <select className="form-control"
                                                {...register('isFeatured', {
                                                    required: true
                                                })}
                                            >

                                                <option  value="true">
                                                    True
                                                </option>
                                                <option value="false">
                                                    False
                                                </option>
                                            </select>
                                        </div>
                                        <div className="Field-group mb-3">
                                        <p>Qunatity*</p>
                                            <input
                                                {...register('quantity', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="quantity"
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
                                </div>
                                {Spinner ? ( 
                                        <Loader type="bubble-top"
                                        className="mt-5"
                                        bgColor={"#000000"}
                                            title={"...loading"} size={100} /> 
                                            ) : null }
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AddPrdouctPage;
