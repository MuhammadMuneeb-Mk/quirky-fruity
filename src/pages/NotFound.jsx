import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import lostFruit from '../assets/Deliciously-Splatter-Fruit.webp'
import { usePageTitle } from '../hooks/usePageTitle'

const NotFound = () => {
  usePageTitle('Page not found')
  return (
    <div className="grid-paper" style={{ paddingBlock: 'clamp(56px, 10vw, 120px)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <img
          src={lostFruit}
          alt=""
          width="180"
          height="188"
          style={{ margin: '0 auto 24px', animation: 'float 4s ease-in-out infinite' }}
        />
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', marginBottom: 12 }}>
          Page not <span className="highlight">found</span>
        </h1>
        <p style={{ color: 'var(--ink-soft)', marginBottom: 28 }}>
          The page you are looking for doesn't exist or the link is wrong.
        </p>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          size="large"
          sx={{ mr: 1.5, mb: 1.5 }}
        >
          See the menu
        </Button>
        <Button component={Link} to="/" color="secondary" size="large" sx={{ mb: 1.5 }}>
          Back home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
