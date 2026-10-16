import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useReveal } from '../hooks/useReveal'
import './Newsletter.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const Newsletter = ({ background }) => {
  useReveal()
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Tell us what to call you.'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    // no backend for this yet, just fake a short delay
    setTimeout(() => setStatus('done'), 700)
  }

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  return (
    <section
      className="newsletter"
      style={{ backgroundImage: `url(${background})` }}
      aria-labelledby="newsletter-title"
    >
      <div className="container">
        <div className="newsletter__card" data-reveal>
          <h2 id="newsletter-title">
            Newsletter <span className="highlight">registration</span>
          </h2>
          <p>Sign up to hear about new flavours and offers.</p>

          {status === 'done' ? (
            <div className="newsletter__done" role="status">
              <CheckCircleIcon />
              <span>Thanks {form.name.trim().split(' ')[0]}, you're subscribed.</span>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="First name"
                autoComplete="given-name"
                value={form.name}
                onChange={update('name')}
                error={Boolean(errors.name)}
                helperText={errors.name || ' '}
              />
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                error={Boolean(errors.email)}
                helperText={errors.email || ' '}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={status === 'sending'}
                className="newsletter__submit"
              >
                {status === 'sending' ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
