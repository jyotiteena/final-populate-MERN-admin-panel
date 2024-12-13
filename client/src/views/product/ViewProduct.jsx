import { CButton, CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MomentDate from '../../utils/MomentDate'
import { fetchData } from '../../Redux/commonSlice'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import swal from 'sweetalert';
import { NavLink, useNavigate } from 'react-router-dom'
const ViewProduct = () => {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData({ model: 'product', method: 'GET' }));
  }, [dispatch])
  const productList = useSelector((state) => state?.common?.apiData?.product)
  function trash(id) {
    swal({
        title: "Are you sure Delete this item?",
        icon: "warning",
        buttons: true,
    }).then((willDelete) => {
        if (willDelete) {
            dispatch(fetchData({ model: 'product', method: 'DELETE', id }))
                .then(() => {
                    dispatch(fetchData({ model: 'product', method: 'GET' }));
                });
        }
    });
}


  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='bg-dark text-white'>
            <strong>View Product</strong>
          </CCardHeader>
          <CCardBody className='table-responsive'>
            <CTable className='text-center'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Qty</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product desc</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Create Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Update Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  productList && productList[0]?.product.map((product, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{product?.category_id?.category_name}</CTableDataCell>
                        <CTableDataCell>{product.p_name}</CTableDataCell>
                        <CTableDataCell>{product.p_price}</CTableDataCell>
                        <CTableDataCell>{product.p_qty}</CTableDataCell>
                        <CTableDataCell>{product.p_desc}</CTableDataCell>
                        <CTableDataCell><img src={product.p_image_url} alt="" width={100} height={100} /></CTableDataCell>
                        <CTableDataCell>{MomentDate(product.createdAt)}</CTableDataCell>
                        <CTableDataCell>{MomentDate(product.updatedAt)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton onClick={() => trash(product._id)} className='btn btn-danger text-white'>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          <NavLink to={`/product/edit/${product._id}`} className='btn btn-warning mx-3'>
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
