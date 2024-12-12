import {CButton,CCard,CCardBody,CCardHeader,CCol,CForm,CFormInput,CFormLabel,CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/commonSlice';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useEffect } from 'react';

const AddCategory = () => {
    const { id } = useParams(); 
    console.log("id.........")
    console.log(id)
    const redirect = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();

    // Populate the form fields when editing

    const categoryList = useSelector((state) => state?.common?.apiData?.category)
    useEffect(() => {
        dispatch(fetchData({ model: 'category', method: 'GET' }))
        var filterData;
        if (categoryList) {
            console.log(categoryList[0].category)
            filterData = categoryList[0].category.find((category) => {
                return category._id === id
            })
            reset(filterData)
        }
    }, [dispatch])

    async function Add(data) {
        const apiMethod = id ? 'PUT' : 'POST';
        const res = await dispatch(fetchData({ model: 'category', method: apiMethod, data, id }));
        if (res?.payload?.error) {
            swal({
                title: res.payload.error || "error",
                icon: 'error',
                dangerMode: true,
            });
        } else {
            await swal(res?.payload?.message || "Updated");
            reset();
            redirect('/category/view');
        }
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-white'>
                            <strong>{id ? 'Edit Category' : 'Add Category'}</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm method="post" onSubmit={handleSubmit(Add)} >
                                <div className="mb-3">
                                    <CFormLabel htmlFor="category">Category Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="category"
                                        placeholder="Enter Category Name"
                                        {...register('category_name', {
                                            required: {
                                                value: true,
                                                message: "Please enter category name"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.category_name?.message}</p>
                                </div>
                                <CButton type='submit' className='btn btn-outline-success'>
                                    {id ? 'Update' : 'Submit'}
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default AddCategory;
