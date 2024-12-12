import { CButton, CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MomentDate from '../../utils/MomentDate'
import { fetchData } from '../../Redux/commonSlice'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom'
const ViewProduct = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData({ model: 'category', method: 'GET' }));
  }, [dispatch])
  const categoryList = useSelector((state) => state?.common?.apiData?.category)
  function trash(id) {
    swal({
      title: "Are you sure Delete this item?",
      icon: "warning",
      buttons: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(fetchData({ model: 'category', method: 'DELETE', id: id }))
          dispatch(fetchData({ model: 'category', method: 'GET' }));
        }
      });
  }

  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='bg-dark text-white'>
            <strong>View Category</strong>
          </CCardHeader>
          <CCardBody>
            <CTable className='text-center'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Create Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Update Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  categoryList && categoryList[0]?.category.map((category, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{category.category_name}</CTableDataCell>
                        <CTableDataCell>{MomentDate(category.createdAt)}</CTableDataCell>
                        <CTableDataCell>{MomentDate(category.updatedAt)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton onClick={() => trash(category._id)} className='btn btn-danger text-white'>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          <NavLink to={`/category/edit/${category._id}`} className='btn btn-warning mx-3'>
                            <CIcon icon={cilPencil} />
                          </NavLink>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  }
                  )
                }
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default ViewProduct
