import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartNotice from './components/CartNotice'
import Home from './pages/Home'
import { useCart } from './context/useCart'

const CartDrawer = lazy(() => import('./components/CartDrawer'))

// lazy load the other pages
const Menu = lazy(() => import('./pages/Menu'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetail = lazy(() => import('./pages/OrderDetail'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// scroll to top (or to the #section) when the route changes
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

// the drawer code is only downloaded the first time the cart is opened
function LazyCartDrawer() {
  const { isOpen } = useCart()
  const [wanted, setWanted] = useState(false)
  if (isOpen && !wanted) setWanted(true)
  if (!wanted) return null
  return (
    <Suspense fallback={null}>
      <CartDrawer />
    </Suspense>
  )
}

function App() {
  const { pathname } = useLocation()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <LazyCartDrawer />
      <CartNotice />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<LinearProgress color="primary" aria-label="Loading page" />}>
          {/* re-keyed on each page so the new page fades in */}
          <div key={pathname} className="page-fade">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
