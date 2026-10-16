import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useCart } from '../context/useCart'
import { placeOrder } from '../services/orders'
import { usePageTitle } from '../hooks/usePageTitle'
import { computeTotals } from '../utils/pricing'
import { formatPrice } from '../utils/format'
import emptyArt from '../assets/try-some-new-fruit.webp'
import './Checkout.css'

const EMPTY_FORM = { name: '', phone: '', email: '', address: '', notes: '' }

const validate = (form, fulfilment) => {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Enter your name so we can call it out.'
  if (!/^\+?[\d\s-]{10,16}$/.test(form.phone.trim()))
    errors.phone = 'Enter a phone number with at least 10 digits.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = 'Enter a valid email, like name@example.com.'
  if (fulfilment === 'delivery' && form.address.trim().length < 8)
    errors.address = 'Enter a full delivery address.'
  return errors
}

const Checkout = () => {
  usePageTitle('Checkout')
  const { lines, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY_FORM)
  const [fulfilment, setFulfilment] = useState('pickup')
  const [payment, setPayment] = useState('cash')
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [placed, setPlaced] = useState(false)

  // preload the order page
  useEffect(() => {
    import('./OrderDetail')
  }, [])

  const totals = computeTotals(subtotal, fulfilment)
  const errors = validate(form, fulfilment)
  const showError = (field) => touched[field] && errors[field]

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, phone: true, email: true, address: true })
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0]
      document.getElementById(`checkout-${first}`)?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const order = await placeOrder({
        lines,
        totals,
        fulfilment,
        payment,
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: fulfilment === 'delivery' ? form.address.trim() : '',
          notes: form.notes.trim(),
        },
      })
      setPlaced(true)
      clear()
      navigate(`/orders/${order.id}`, { state: { justPlaced: true } })
    } catch (err) {
      setSubmitError(err.message || 'We could not place your order. Please try again.')
      setSubmitting(false)
    }
  }

  if (placed) {
    return (
      <div className="checkout-page grid-paper">
        <div className="container checkout-empty" role="status">
          <CircularProgress color="primary" />
          <p>Order placed. Opening your receipt…</p>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="checkout-page grid-paper">
        <div className="container checkout-empty">
          <img src={emptyArt} alt="" width="220" height="250" />
          <h1>Your cart is empty</h1>
          <p>Add a drink or two from the menu, then come back here to check out.</p>
          <Button component={Link} to="/menu" variant="contained" size="large">
            See the menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page grid-paper">
      <div className="container">
        <Button
          component={Link}
          to="/menu"
          startIcon={<ArrowBackIcon />}
          color="secondary"
          sx={{ mb: 2, px: 1 }}
        >
          Back to menu
        </Button>
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="checkout-section">
              <legend className="checkout-section__title">1. How would you like it?</legend>
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={fulfilment}
                onChange={(_e, value) => {
                  if (!value) return
                  setFulfilment(value)
                  setTouched((t) => ({ ...t, address: false }))
                }}
                aria-label="Pickup or delivery"
                className="checkout-toggle"
              >
                <ToggleButton value="pickup">
                  <StorefrontOutlinedIcon />
                  <span>
                    <strong>Pickup</strong>
                    <small>Ready in about 15 min</small>
                  </span>
                </ToggleButton>
                <ToggleButton value="delivery">
                  <DeliveryDiningOutlinedIcon />
                  <span>
                    <strong>Delivery</strong>
                    <small>About 35 min</small>
                  </span>
                </ToggleButton>
              </ToggleButtonGroup>
            </fieldset>

            <fieldset className="checkout-section">
              <legend className="checkout-section__title">2. Your details</legend>
              <div className="checkout-fields">
                <TextField
                  id="checkout-name"
                  label="Full name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  onBlur={blur('name')}
                  error={Boolean(showError('name'))}
                  helperText={showError('name') || ' '}
                  required
                />
                <TextField
                  id="checkout-phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="0300 1234567"
                  value={form.phone}
                  onChange={update('phone')}
                  onBlur={blur('phone')}
                  error={Boolean(showError('phone'))}
                  helperText={showError('phone') || ' '}
                  required
                />
                <TextField
                  id="checkout-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  onBlur={blur('email')}
                  error={Boolean(showError('email'))}
                  helperText={showError('email') || 'We send the receipt here.'}
                  required
                  className="checkout-fields__wide"
                />
                {fulfilment === 'delivery' && (
                  <TextField
                    id="checkout-address"
                    label="Delivery address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={update('address')}
                    onBlur={blur('address')}
                    error={Boolean(showError('address'))}
                    helperText={showError('address') || ' '}
                    required
                    multiline
                    minRows={2}
                    className="checkout-fields__wide"
                  />
                )}
                <TextField
                  id="checkout-notes"
                  label="Notes for the bar (optional)"
                  placeholder="Less ice, no ginger, ring the bell twice…"
                  value={form.notes}
                  onChange={update('notes')}
                  multiline
                  minRows={2}
                  className="checkout-fields__wide"
                />
              </div>
            </fieldset>

            <fieldset className="checkout-section">
              <legend className="checkout-section__title">3. Payment</legend>
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={payment}
                onChange={(_e, value) => value && setPayment(value)}
                aria-label="Payment method"
                className="checkout-toggle checkout-toggle--compact"
              >
                <ToggleButton value="cash">Cash</ToggleButton>
                <ToggleButton value="card">
                  Card on {fulfilment === 'pickup' ? 'pickup' : 'delivery'}
                </ToggleButton>
              </ToggleButtonGroup>
              <p className="checkout-note">
                You pay when you collect your order. Nothing is charged online.
              </p>
            </fieldset>

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitting}
              sx={{ py: 1.75, fontSize: '1.1rem' }}
            >
              {submitting ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1.5 }} />
                  Placing your order…
                </>
              ) : (
                `Place order · ${formatPrice(totals.total)}`
              )}
            </Button>
            <p className="checkout-note checkout-note--center">
              Your details are only saved in this browser.{' '}
              <Link to="/privacy">Privacy &amp; terms</Link>
            </p>
          </form>

          <aside className="checkout-summary" aria-label="Order summary">
            <h2>Your order</h2>
            <ul>
              {lines.map((line) => (
                <li key={line.id}>
                  <span className="checkout-summary__qty">{line.qty}×</span>
                  <span className="checkout-summary__name">{line.name}</span>
                  <span>{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>
                  {fulfilment === 'pickup'
                    ? 'Pickup'
                    : totals.delivery
                      ? formatPrice(totals.delivery)
                      : 'Free'}
                </dd>
              </div>
              <div className="checkout-summary__total">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout
