import App from '@/App'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/profiles/:id',
        Component: lazy(() => import('@/pages/Profile')),
      },
      {
        path: '*',
        Component: lazy(() => import('@/pages/NotFound')),
      },
    ],
  },
  {
    path: '/login',
    Component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/register',
    Component: lazy(() => import('@/pages/Register')),
  },
  {
    path: '/coming-soon',
    Component: lazy(() => import('@/pages/ComingSoon')),
  },
])
