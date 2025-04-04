import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

/// Category 
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))
const ViewCategory = React.lazy(() => import('./views/category/ViewCategory'))

/// product
const AddProduct = React.lazy(() => import('./views/product/AddProduct'))
const ViewProduct = React.lazy(() => import('./views/product/ViewProduct'))

/// 

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user/list', name: 'Colors', element: Colors },
  { path: '/user/payment', name: 'Typography', element: Typography },

  ///// category
  { path: '/category/add', name: 'Add', element: AddCategory },
  { path: '/category/view', name: 'View', element: ViewCategory },
  { path: '/category/edit/:id', name: 'Update', element: AddCategory },

  //// product
  { path: '/product/add', name: 'Add', element: AddProduct },
  { path: '/product/view', name: 'View', element: ViewProduct },
  { path: '/product/edit/:id', name: 'Update', element: AddProduct },
]

export default routes
