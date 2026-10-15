import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './QuantityStepper.css'

const QuantityStepper = ({ value, onChange, label, size = 'medium' }) => (
  <div className={`stepper stepper--${size}`} role="group" aria-label={`Quantity of ${label}`}>
    <IconButton
      size="small"
      onClick={() => onChange(value - 1)}
      aria-label={value === 1 ? `Remove ${label}` : `One less ${label}`}
      sx={{ color: 'inherit' }}
    >
      <RemoveIcon fontSize="small" />
    </IconButton>
    <span className="stepper__value" aria-live="polite">
      {value}
    </span>
    <IconButton
      size="small"
      onClick={() => onChange(value + 1)}
      aria-label={`One more ${label}`}
      disabled={value >= 20}
      sx={{ color: 'inherit' }}
    >
      <AddIcon fontSize="small" />
    </IconButton>
  </div>
)

export default QuantityStepper
