import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/commonSlice';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
    const { id } = useParams();
    const [productImg, setImage] = useState("")
    const redirect = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state?.common?.apiData?.category);
    const productList = useSelector((state) => state?.common?.apiData?.product);

    useEffect(() => {
        dispatch(fetchData({ model: 'category', method: 'GET' }));
        dispatch(fetchData({ model: 'product', method: 'GET' }));

        if (productList && id) {
            const filterData = productList[0]?.product?.find((product) => product._id === id);
            if (filterData) {
                reset(filterData);
                console.log("filterData?.p_image_url...............");
                console.log(filterData?.p_image_url)
                setValue('category_id', filterData?.category_id?._id);
                setImage(filterData?.p_image_url);
            }
        }
    }, [dispatch]);

    const finalResult = categoryList ? categoryList[0]?.category : [];

    async function Add(data) {
        const formData = new FormData();
        formData.append('p_name', data.p_name);
        formData.append('p_price', data.p_price);
        formData.append('p_qty', data.p_qty);
        formData.append('p_desc', data.p_desc);
        formData.append('category_id', data.category_id);
        if (data.p_image_url[0]) {
            formData.append('p_image_url', data.p_image_url[0]); // Append the image file
        }

        const apiMethod = id ? 'PUT' : 'POST';

        const res = await dispatch(fetchData({
            model: 'product',
            method: apiMethod,
            data: formData,
            id
        }));

        if (res?.payload?.error) {
            swal({
                title: res.payload.error,
                icon: 'error',
                dangerMode: true,
            });
        } else {
            await swal(res?.payload?.message);
            reset();
            redirect('/product/view');
        }
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-white'>
                            <strong>{id ? 'Edit Product' : 'Add Product'}</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm method="post" onSubmit={handleSubmit(Add)} encType="multipart/form-data">
                                <div className="mb-3">
                                    <CFormLabel htmlFor="category">Category Name</CFormLabel>
                                    <CFormSelect {...register('category_id', {
                                        required: {
                                            value: true,
                                            message: "Please select a category"
                                        }
                                    })}>
                                        <option disabled value="">Choose Any One</option>
                                        {finalResult?.map((category) => (
                                            <option key={category._id} value={category._id}>{category.category_name}</option>
                                        ))}
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
                                                message: "Please enter product name"
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
                                                message: "Please enter product price"
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
                                        placeholder="Enter Product Quantity"
                                        {...register('p_qty', {
                                            required: {
                                                value: true,
                                                message: "Please enter product quantity"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.p_qty?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="desc">Product Description</CFormLabel>
                                    <CFormTextarea
                                        id="desc"
                                        rows={3}
                                        placeholder="Enter Product Description"
                                        {...register('p_desc', {
                                            required: {
                                                value: true,
                                                message: "Please enter product description"
                                            }
                                        })}
                                    ></CFormTextarea>
                                    <p className='text-danger'>{errors?.p_desc?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="image">Product Image</CFormLabel>
                                    <CFormInput
                                        type="file"
                                        id="image"
                                        {...register('p_image_url', {
                                            required: {
                                                value: !id, // Only required if adding a new product
                                                message: "Please upload a product image"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.p_image_url?.message}</p>
                                </div>
                                <CButton type="submit" className="btn btn-outline-success">
                                    {id ? 'Update' : 'Submit'}
                                </CButton>
                                {
                                    productImg && <div className="mt-4">
                                        <img src={productImg} alt="" width={200} height={200} />
                                    </div>
                                }
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default AddProduct;