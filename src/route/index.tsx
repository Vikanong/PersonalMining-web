import React, { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

interface Router {
  name?: string,
  path: string,
  children?: Array<Router>,
  element: any
}

const lazyLoad = (path: any) => {
  const Comp = lazy(() => import(`views/${path}`))
  return (
    <Suspense fallback={<>loading...</>}>
      <Comp />
    </Suspense>
  )
}

const router: Array<Router> = [
  {
    name: "home",
    path: '/',
    element: lazyLoad('home')
  },
  {
    name: "about",
    path: '/about',
    element: lazyLoad('about')
  },
  {
    name: "connect",
    path: '/connect',
    element: lazyLoad('connectWallet')
  },
  {
    name: "Navigate",
    path: "",
    element: Navigate
  }
]

const Routelist = () => {
  return useRoutes(router)
}

export default Routelist