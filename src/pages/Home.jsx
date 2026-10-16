import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ProductCard from '../components/ProductCard'
import WaveEdge from '../components/WaveEdge'
import { useCart } from '../context/useCart'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { FEATURED_IDS, PRODUCTS, getProduct } from '../data/menu'
import { formatPrice } from '../utils/format'
import fruitLeft from '../assets/left-fruit-hero.webp'
import fruitRight from '../assets/right-fruit-hero.webp'
import heroSplatter from '../assets/hero-img-splatter.webp'
import freshSticker from '../assets/Deliciously-Splatter.webp'
import papayaPeek from '../assets/Deliciously-Splatter-Fruit.webp'
import pineapple from '../assets/pineapple-fav-section.webp'
import avocado from '../assets/beat-summer-right-fruit.webp'
import fruitTrio from '../assets/try-some-new-fruit.webp'
import splatterRight from '../assets/splatter-right-edge.webp'
import splatterLeft from '../assets/splatter-left-edge.webp'
import fruitLineup from '../assets/fresh-fruit-img-bottom.webp'
import bubbles from '../assets/circle-background.webp'
import './Home.css'

const Newsletter = lazy(() => import('../components/Newsletter'))

const FAVOURITE_LISTS = [
  { title: 'Smoothies', category: 'smoothie' },
  { title: 'Fresh juice', category: 'juice' },
]

function FavouriteList({ title, category }) {
  const { add } = useCart()
  const items = PRODUCTS.filter((p) => p.category === category).slice(0, 3)

  return (
    <div className="fav-list">
      <h3 className="fav-list__pill">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="fav-row">
            <span className="fav-row__name">{item.name}</span>
            <span className="fav-row__dots" aria-hidden="true" />
            <span className="fav-row__price">{formatPrice(item.price)}</span>
            <IconButton
              size="small"
              onClick={() => add(item.id)}
              aria-label={`Add ${item.name} to cart`}
              className="fav-row__add"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Home = () => {
  const featured = FEATURED_IDS.map(getProduct)
  useReveal()
  usePageTitle()

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero grid-paper" aria-labelledby="hero-title">
        <div className="hero__inner container">
          <div className="hero__side hero__side--left">
            <div className="hero__art">
              <img src={heroSplatter} alt="" className="hero__splat" />
              <img src={fruitLeft} alt="" className="hero__fruit" />
            </div>
            <p className="hero__hours">
              Open daily
              <br />
              <span className="highlight">8</span>am - <span className="highlight">10</span>pm
            </p>
          </div>

          <div className="hero__center">
            <h1 id="hero-title">
              Treat yourself to something <span className="highlight">fresh</span> &amp;{' '}
              <span className="highlight">tasty</span>
            </h1>
            <p className="hero__lede">
              Fresh juices and smoothies made from real fruit. Order online and pick it up in about
              15 minutes.
            </p>
            <div className="hero__ctas">
              <Button
                component={Link}
                to="/menu"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
              >
                Order now
              </Button>
              <Button
                component={Link}
                to="/#favourites"
                variant="outlined"
                color="secondary"
                size="large"
              >
                See favourites
              </Button>
            </div>
          </div>

          <div className="hero__side hero__side--right">
            <div className="hero__art hero__art--flip">
              <img src={heroSplatter} alt="" className="hero__splat" />
              <img src={fruitRight} alt="" className="hero__fruit" />
            </div>
            <p className="hero__tagline">
              Fresh fruit,
              <br />
              pressed every
              <br />
              morning
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about" aria-labelledby="about-title">
        <WaveEdge color="var(--teal)" />
        <div className="about__inner container">
          <div className="about__copy">
            <h2 id="about-title" data-reveal>
              Made fresh <span className="about__highlight">every day</span>
            </h2>
            <p data-reveal style={{ '--reveal-delay': '100ms' }}>
              Whole fruit, no added sugar, made when you order.
            </p>
            <Button component={Link} to="/menu" variant="contained" color="secondary" size="large">
              See the menu
            </Button>
          </div>
          <div className="about__art" data-reveal style={{ '--reveal-delay': '150ms' }}>
            <img src={freshSticker} alt="Deliciously fresh!" className="about__sticker" />
            <img src={papayaPeek} alt="" className="about__papaya" />
          </div>
        </div>
      </section>

      {/* Favourites */}
      <section
        id="favourites"
        className="favourites"
        style={{ backgroundImage: `url(${bubbles})` }}
        aria-labelledby="fav-title"
      >
        <WaveEdge color="var(--cream)" variant={1} />
        <div className="container">
          <h2 id="fav-title" className="section-title" data-reveal>
            All-time <span className="highlight">favourites</span>
          </h2>
          <div className="favourites__inner">
            <img src={pineapple} alt="" className="favourites__art" width="220" height="334" />
            <div className="favourites__lists" data-reveal style={{ '--reveal-delay': '100ms' }}>
              {FAVOURITE_LISTS.map((list) => (
                <FavouriteList key={list.category} {...list} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summer */}
      <section className="split" aria-labelledby="summer-title">
        <div className="split__inner container">
          <div className="split__copy">
            <h2 id="summer-title" data-reveal>
              Beat the summer heat with <span className="highlight">Quirky Fruity</span>
            </h2>
            <p data-reveal style={{ '--reveal-delay': '100ms' }}>
              Our smoothies are blended with frozen fruit instead of ice, so they stay cold and
              thick without getting watery.
            </p>
            <Button
              component={Link}
              to="/menu?category=smoothie"
              variant="contained"
              color="secondary"
              size="large"
            >
              Browse smoothies
            </Button>
          </div>
          <div className="split__art" data-reveal style={{ '--reveal-delay': '150ms' }}>
            <img src={avocado} alt="" width="560" height="358" />
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bestsellers" aria-labelledby="best-title">
        <WaveEdge color="var(--teal)" variant={2} />
        <div className="container">
          <div className="bestsellers__head" data-reveal>
            <h2 id="best-title" className="section-title">
              Best sellers
            </h2>
            <Link to="/menu" className="bestsellers__link">
              See the menu <ArrowForwardIcon fontSize="small" />
            </Link>
          </div>
          <div className="bestsellers__grid" data-reveal style={{ '--reveal-delay': '100ms' }}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Try something new */}
      <section className="split split--reverse" aria-labelledby="try-title">
        <WaveEdge color="var(--cream)" />
        <div className="split__inner container">
          <div className="split__art" data-reveal style={{ '--reveal-delay': '150ms' }}>
            <img src={fruitTrio} alt="" width="460" height="522" />
          </div>
          <div className="split__copy">
            <h2 id="try-title" data-reveal>
              Try something that feels <span className="highlight">new</span> and{' '}
              <span className="highlight">you</span>
            </h2>
            <p data-reveal style={{ '--reveal-delay': '100ms' }}>
              Not sure what to pick? The Trio Tasting Box has three of our juices in smaller bottles
              so you can try a few.
            </p>
            <Button
              component={Link}
              to="/menu?category=shot"
              variant="contained"
              color="secondary"
              size="large"
            >
              Get the tasting box
            </Button>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="refresh grid-paper" aria-labelledby="refresh-title">
        <img src={splatterRight} alt="" className="refresh__splat refresh__splat--right" />
        <img src={splatterLeft} alt="" className="refresh__splat refresh__splat--left" />
        <div className="container refresh__copy">
          <h2 id="refresh-title" data-reveal>
            Feel refreshed with these <span className="highlight">fresh fruit</span> drinks
          </h2>
          <img
            src={fruitLineup}
            alt=""
            className="refresh__lineup"
            width="1260"
            height="399"
            data-reveal
            style={{ '--reveal-delay': '100ms' }}
          />
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Order now
          </Button>
        </div>
      </section>

      <Suspense fallback={null}>
        <Newsletter background={bubbles} />
      </Suspense>
    </div>
  )
}

export default Home
