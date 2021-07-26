import React, {useState, useEffect, forwardRef} from 'react';
/* eslint-disable */

import Grid from '@material-ui/core/Grid';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import {Button} from '@app/components/index';
import Modal from 'react-bootstrap/Modal';
import EditProdutModal from '@app/pages/Products/EditProductModal';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: `https://badilnyint.com/`
});

const ProductsDataTable = () => {
    const [show, setShow] = useState(false);
    const [userID, setUserID] = useState('');
    const [title, setTitle] = useState('');
    //description //image
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [quantity, setquantity] = useState('');
    const [status, setstatus] = useState('');
    const [isFeatured, setisFeatured] = useState('');
    const [isShow, setisShow] = useState('');

    const handleClick = (event, rowData) => {
        event.preventDefault();
        console.log(rowData);
        setUserID(rowData.id);
        setTitle(rowData.title);
        setDescription(rowData.description);
        setImage(rowData.image);
        setisShow(rowData.isShow);
        setCategory(rowData.category);
        setisFeatured(rowData.isFeatured);
        setstatus(rowData.status);
        setSubCategory(rowData.subcategory);
        setquantity(rowData.quantity);

        setShow(true);
    };
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        {
            setUserID(e.id);
        }
        {
            console.log(e.id);
        }
        setShow(true);
    };

    const ImageHandler = (e) => {
        alert(e);
    };

    const columns = [
        {title: 'id', field: '_id', hidden: true},

        {title: 'title', field: 'title'},
        {title: 'Desc', field: 'description'},
        {title: 'category', field: 'category'},
        {title: 'subcategory', field: 'subcategory'},
        {title: 'recommendCategory', field: 'recommendCategory'},
        {title: 'recommendSubcategory', field: 'recommendSubcategory'},

        {
            title: 'image',
            field: 'image',

            render: (item) => (
                <>
                    <img
                        src={`https://badilnyint.com/` + item.image}
                        alt=""
                        border="3"
                        height="100"
                        width="100"
                    />
                </>
            )
        },

        {title: 'quantity', field: 'quantity', editable: 'never'},
        {
            title: 'status',
            field: 'status',
            lookup: {active: 'active', inactive: 'inactive', blocked: 'blocked'}
        },
        {title: 'isFeatured', field: 'isFeatured'},
        {title: 'isShow', field: 'isShow'}
    ];
    const [data, setData] = useState([]); // table data

    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('/api/product/all')
            .then((res) => {
                setData(res.data.products);
            })
            .catch((error) => {
                console.log('Error');
            });
    }, []);

    const handleRowUpdate = (newData, oldData, resolve) => {
        // validation
        const errorList = [];
        if (newData.title === '') {
            errorList.push('Please enter valid title');
        }
        if (newData.description === '') {
            errorList.push('Please enter valid description');
        }

        if (errorList.length < 1) {
            api.patch(`/api/product/${newData.id}`, newData)
                .then((res) => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                    setIserror(false);
                    setErrorMessages([]);
                })
                .catch((error) => {
                    setErrorMessages([`Update failed! Server error${error}`]);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    // const handleRowAdd = (newData, resolve) => {
    //     // validation
    //     const errorList = [];
    //     if (newData.first_name === undefined) {
    //         errorList.push('Please enter first name');
    //     }
    //     if (newData.last_name === undefined) {
    //         errorList.push('Please enter last name');
    //     }
    //     if (
    //         newData.email === undefined ||
    //         validateEmail(newData.email) === false
    //     ) {
    //         errorList.push('Please enter a valid email');
    //     }

    //     if (errorList.length < 1) {
    //         // no error
    //         api.post('/users', newData)
    //             .then((res) => {
    //                 const dataToAdd = [...data];
    //                 dataToAdd.push(newData);
    //                 setData(dataToAdd);
    //                 resolve();
    //                 setErrorMessages([]);
    //                 setIserror(false);
    //             })
    //             .catch((error) => {
    //                 setErrorMessages(['Cannot add data. Server error!']);
    //                 setIserror(true);
    //                 resolve();
    //             });
    //     } else {
    //         setErrorMessages(errorList);
    //         setIserror(true);
    //         resolve();
    //     }
    // };

    const handleRowDelete = (oldData, resolve) => {
        api.delete(`/api/product/${oldData.id}`)
            .then((res) => {
                console.log(oldData.id);
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
            })
            .catch((error) => {
                setErrorMessages(['Delete failed! Server error']);
                setIserror(true);
                resolve();
            });
    };

    // const handleRowSatusUpdate = (oldData, resolve) => {
    //     api.delete(`/api/product/${oldData.id}`)
    //         .then((res) => {
    //             console.log(oldData.id);
    //             const dataDelete = [...data];
    //             const index = oldData.tableData.id;
    //             dataDelete.splice(index, 1);
    //             setData([...dataDelete]);
    //             resolve();
    //         })
    //         .catch((error) => {
    //             setErrorMessages(['Delete failed! Server error']);
    //             setIserror(true);
    //             resolve();
    //         });
    // };

    return (
        <div className="App">
            <Grid container spacing={2}>
                <Grid item />
                <Grid item md={12}>
                    <div>
                        {iserror && (
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>;
                                })}
                            </Alert>
                        )}
                    </div>
                </Grid>
                <Grid item />
            </Grid>
            <div className="row">
                <div className="col-lg-12 col-m-6 col-sm-12">
                    <MaterialTable
                        options={{
                            exportButton: true,
                            // selection: true,
                            filtering: true
                        }}
                        title="List of Feautured Products (title,desc are editable)"
                        onRowClick={handleClick}
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            // onRowUpdate: (newData, oldData) =>
                            //     new Promise((resolve) => {
                            //         handleRowUpdate(newData, oldData, resolve);
                            //     }),
                            // onRowAdd: (newData) =>
                            //     new Promise((resolve) => {
                            //         handleRowAdd(newData, resolve);
                            //     }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve);
                                })
                        }}
                        // actions={[
                        //     {
                        //         tooltip: 'make active all products',
                        //         icon: 'delete',
                        //         onClick: (evt, data) => {
                        //             alert(
                        //                 'You want to delete ' + data.length + ''
                        //             )

                        //             api.delete(`/api/product/${data._id}`)
                        //             .then((res) => {
                        //                 console.log(data._id);
                        //                 const dataDelete = [...data];
                        //                 const index = data.tableData._id;
                        //                 dataDelete.splice(index, 1);
                        //                 setData([...dataDelete]);
                        //             })
                        //             .catch((error) => {
                        //                 setErrorMessages(['Delete failed! Server error']);
                        //                 setIserror(true);
                        //             })
                        //         }
                        //     }
                        // ]}
                    />
                </div>
            </div>{' '}
            <>
                {/* <Button
                        variant="primary"
                        className="my-2"
                        onClick={handleShow}
                    >
                        Edit
                    </Button> */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProdutModal
                            userId={userID}
                            title={title}
                            description={description}
                            image={image}
                            isFeatured={isFeatured}
                            isShow={isShow}
                            status={status}
                            quantity={quantity}
                            subcategory={subcategory}
                            category={category}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default ProductsDataTable;
