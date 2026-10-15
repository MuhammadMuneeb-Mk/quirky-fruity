import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useCart } from '../context/useCart'

const CartNotice = () => {
  const { notice, dismissNotice, openCart, isOpen } = useCart()

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return
    dismissNotice()
  }

  return (
    <Snackbar
      key={notice?.key}
      open={Boolean(notice) && !isOpen}
      autoHideDuration={2600}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ bgcolor: 'var(--ink)', color: 'var(--cream)', alignItems: 'center' }}
        action={
          <Button
            size="small"
            onClick={() => {
              dismissNotice()
              openCart()
            }}
            sx={{ color: 'var(--mustard)', fontWeight: 700 }}
          >
            View cart
          </Button>
        }
      >
        {notice?.message}
      </Alert>
    </Snackbar>
  )
}

export default CartNotice
