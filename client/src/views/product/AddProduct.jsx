import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/commonSlice';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const redirect = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const dispatch = useDispatch();


    const categoryList = useSelector((state) => state?.common?.apiData?.category)
    useEffect(() => {
        dispatch(fetchData({ model: 'category', method: 'GET' }))
    }, [dispatch])
    let finalResult;
    if (categoryList) {
        finalResult = categoryList[0].category
    }

    async function Add(data) {
        const res = await dispatch(fetchData({ model: 'product', method: 'POST', data}));
        console.log("res.........")
        console.log(res)
        if (res?.payload?.error) {
            swal({
                title: res.payload.error,
                icon: 'error',
                dangerMode: true,
            });
        } else {
            await swal(res?.payload?.message);
            reset();
            redirect('/product/view'); // Redirect to the category list after success
        }
    }
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-white'>
                            <strong>Add Category</strong></CCardHeader>
                        <CCardBody>
                            <CForm method="post"  onSubmit={handleSubmit(Add)}>

                                <div className="mb-3">
                                    <CFormLabel htmlFor="category">Category Name</CFormLabel>
                                    <CFormSelect {...register('category_id', {
                                        required: {
                                            value: true,
                                            message: "please Select Category"
                                        }
                                    })}>
                                        <option disabled selected value="">Choose Any One</option>
                                        {
                                            finalResult?.map((category) => {
                                                return (
                                                    <option value={category._id}>{category.category_name}</option>
                                                )
                                            })
                                        }
                                    </CFormSelect>
                                    <p className='text-danger'>{errors?.category_id?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="product">Product Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="product"
                                        placeholder="Enter Product Name"
                                        {...register('p_name', {
                                            required: {
                                                value: true,
                                                message: "Please Enter Product Name"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.p_name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="price">Product Price</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="price"
                                        placeholder="Enter Product Price"
                                        {...register('p_price', {
                                            required: {
                                                value: true,
                                                message: "Please Enter Product Price"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.p_price?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="qty">Product Qty</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="qty"
                                        placeholder="Enter Product QTY"
                                        {...register('p_qty', {
                                            required: {
                                                value: true,
                                                message: "Please Enter Product Qty"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.p_qty?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="desc">Product Description</CFormLabel>
                                    <CFormTextarea id="desc" rows={3}
                                        placeholder="Enter Product Description"
                                        {...register('p_desc', {
                                            required: {
                                                value: true,
                                                message: "Please Enter Product Description"
                                            }
                                        })}></CFormTextarea>
                                    <p className='text-danger'>{errors?.p_desc?.message}</p>

                                </div>
                                <CButton type='submit' className='btn btn-outline-success'>
                                    {/* {id ? 'Update' : 'Submit'} */}
                                    submit
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default AddProduct;
