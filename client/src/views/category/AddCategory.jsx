import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow, } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { fetchData } from '../../Redux/commonSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
// import { addCategory } from '../../Redux/userSlice';
const AddCategory = () => {
    const redirect = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()
    async function Add(data) {
        const res = await dispatch(fetchData({ model: 'category', method: 'POST', data: data }));
        if (res?.payload?.error) {
            swal({
                title: res.payload.error,
                icon: "error",
                dangerMode: true,
            })
        } else {
            swal(res.payload.message)
            reset()
        }
    }
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-white'>
                            <strong>Add Category</strong>
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
                                                message: "please Enter Category Name"
                                            }
                                        })}
                                    />
                                    <p className='text-danger'>{errors?.category_name?.message}</p>
                                </div>
                                <CButton type='submit' className='btn btn-outline-success'>Submit</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default AddCategory
