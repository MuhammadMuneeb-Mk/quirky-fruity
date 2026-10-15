import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useCart } from '../context/useCart'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/#about', label: 'About', hash: true },
  { to: '/orders', label: 'My orders' },
]

const Navbar = () => {
  const { count, openCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // close the mobile menu when the route changes
  const [lastPath, setLastPath] = useState(location.pathname + location.hash)
  if (lastPath !== location.pathname + location.hash) {
    setLastPath(location.pathname + location.hash)
    setIsOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main">
        <Link to="/" className="navbar__logo" aria-label="Quirky Fruity home">
          Quirky<span>Fruity</span>
        </Link>

        <ul id="nav-links" className={`navbar__links ${isOpen ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.to}>
              {link.hash ? (
                <Link to={link.to} className="navbar__link">
                  {link.label}
                </Link>
              ) : (
                <NavLink to={link.to} end={link.end} className="navbar__link">
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
          <li className="navbar__cta">
            <Link to="/menu" className="navbar__order">
              Order now
            </Link>
          </li>
        </ul>

        <div className="navbar__actions">
          <IconButton
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className="navbar__cart"
            sx={{ color: 'inherit' }}
          >
            <Badge
              badgeContent={count}
              max={99}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: 'var(--mustard)',
                  color: 'var(--ink)',
                  fontWeight: 700,
                  border: '2px solid var(--tomato)',
                },
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>

          <button
            type="button"
            className={`navbar__burger ${isOpen ? 'is-open' : ''}`}
            aria-expanded={isOpen}
            aria-controls="nav-links"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
