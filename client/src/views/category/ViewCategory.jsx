import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewCategory } from '../../Redux/categorySlice'
import MomentDate from '../../utils/MomentDate'
import { fetchData } from '../../Redux/commonSlice'
const ViewCategory = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    // dispatch(viewCategory())
    dispatch(fetchData({ model: 'category', method: 'GET' }));
  }, [dispatch])
  const categoryList = useSelector((state) => state?.common?.apiData?.category)
  console.log("categoryList");
  console.log(categoryList)
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
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  categoryList?.category && categoryList?.category.map((category, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{category.category_name}</CTableDataCell>
                        <CTableDataCell>{MomentDate(category.createdAt)}</CTableDataCell>
                        <CTableDataCell>{MomentDate(category.updatedAt)}</CTableDataCell>
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

export default ViewCategory
