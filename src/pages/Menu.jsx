import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/menu'
import WaveEdge from '../components/WaveEdge'
import { usePageTitle } from '../hooks/usePageTitle'
import emptyArt from '../assets/Blue-Fruit-Left-Hero-Section.webp'
import './Menu.css'

const COUNTS = Object.fromEntries(
  CATEGORIES.map((c) => [
    c.id,
    c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length,
  ]),
)

const SORTS = {
  popular: { label: 'Most popular', fn: () => 0 },
  'price-asc': { label: 'Price, low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price, high to low', fn: (a, b) => b.price - a.price },
  name: { label: 'Name, A to Z', fn: (a, b) => a.name.localeCompare(b.name) },
}

const Menu = () => {
  usePageTitle('Menu')
  // filters are saved in the URL
  const [params, setParams] = useSearchParams()
  const category = CATEGORIES.some((c) => c.id === params.get('category'))
    ? params.get('category')
    : 'all'
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'popular'
  const query = params.get('q') || ''

  const updateParam = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((p) => category === 'all' || p.category === category)
      .filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q)),
      )
      .sort(SORTS[sort].fn)
  }, [category, sort, query])

  return (
    <div className="menu-page grid-paper">
      <section className="menu-hero">
        <div className="container menu-hero__inner">
          <div className="menu-hero__copy">
            <h1>
              Our <span className="highlight">menu</span>
            </h1>
            <p>
              Fresh juices, smoothies and shots. Search by fruit or filter by type, then add what
              you like to your cart.
            </p>
          </div>
          <img src={emptyArt} alt="" className="menu-hero__fruit" width="200" height="190" />
        </div>
        <WaveEdge color="var(--cream)" position="bottom" variant={2} />
      </section>

      <section className="container menu-body" aria-labelledby="menu-results">
        <div className="menu-toolbar">
          <div className="menu-chips" role="tablist" aria-label="Category">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={category === c.id}
                className={`menu-chip ${category === c.id ? 'is-active' : ''}`}
                onClick={() => updateParam('category', c.id, 'all')}
              >
                {c.label}
                <span className="menu-chip__count">{COUNTS[c.id]}</span>
              </button>
            ))}
          </div>

          <div className="menu-controls">
            <TextField
              size="small"
              placeholder="Search a fruit, e.g. mango"
              value={query}
              onChange={(e) => updateParam('q', e.target.value, '')}
              slotProps={{
                htmlInput: { 'aria-label': 'Search the menu' },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              select
              size="small"
              label="Sort by"
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value, 'popular')}
            >
              {Object.entries(SORTS).map(([key, s]) => (
                <MenuItem key={key} value={key}>
                  {s.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <h2 id="menu-results" className="menu-count" aria-live="polite">
          {results.length} {results.length === 1 ? 'drink' : 'drinks'}
        </h2>

        {results.length > 0 ? (
          <div className="menu-grid">
            {results.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <img src={emptyArt} alt="" width="140" height="133" />
            <h3>Nothing matches “{query}”</h3>
            <p>Try another fruit, or clear the filters to see the whole menu.</p>
            <Button variant="contained" color="secondary" onClick={() => setParams({})}>
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Menu
