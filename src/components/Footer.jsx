import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import footerFruit from '../assets/footer-fruit-bottom-right.png'
import './Footer.css'

const Footer = () => (
  <footer className="footer" id="about">
    <div className="footer__inner container">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          Quirky
          <br />
          Fruity
        </Link>
        <p>Fresh juices and smoothies made from real fruit. No added sugar.</p>
        <div className="footer__social">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>

      <nav className="footer__col" aria-label="Footer">
        <h2>Explore</h2>
        <Link to="/menu">Full menu</Link>
        <Link to="/menu?category=smoothie">Smoothies</Link>
        <Link to="/menu?category=juice">Fresh juice</Link>
        <Link to="/orders">My orders</Link>
      </nav>

      <div className="footer__col">
        <h2>Visit us</h2>
        <address>DHA Phase 6, Karachi</address>
        <p>Every day, 8am – 10pm</p>
        <p>Pickup in 15 minutes, delivery in 35</p>
      </div>

      <img className="footer__fruit" src={footerFruit} alt="" width="160" height="200" />
    </div>

    <div className="footer__bottom container">
      <p>© {new Date().getFullYear()} Quirky Fruity. A portfolio project, orders are not real.</p>
      <p>
        Built with React, React Router and MUI by{' '}
        <a href="https://github.com/MuhammadMuneeb-Mk" target="_blank" rel="noreferrer">
          Muhammad Muneeb Khan
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
