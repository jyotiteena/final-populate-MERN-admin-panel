import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow, } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { addCategory } from '../../Redux/userSlice';
const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    function Add(data) {
        dispatch(addCategory(data))
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
