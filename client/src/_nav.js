import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Product',
  },
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add',
        to: '/category/add'
      },
      {
        component: CNavItem,
        name: 'View',
        to: '/category/view'
      }
    ]
  },
  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavItem,
    name: 'User List',
    to: '/user/list',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Payment',
    to: '/user/payment',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav
