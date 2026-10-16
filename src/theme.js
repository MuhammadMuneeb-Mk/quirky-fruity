import { createTheme } from '@mui/material/styles'

export const colors = {
  tomato: '#E0532F',
  tomatoDark: '#BF4122',
  buttonOrange: '#CB4723',
  buttonOrangeDark: '#B23D1D',
  teal: '#658F90',
  tealDark: '#4F7576',
  mustard: '#E8B735',
  cream: '#F6EAD0',
  paper: '#FFF8EA',
  ink: '#1B1714',
}

const theme = createTheme({
  palette: {
    primary: { main: colors.buttonOrange, dark: colors.buttonOrangeDark, contrastText: '#fff' },
    secondary: { main: colors.ink, contrastText: colors.cream },
    info: { main: colors.teal },
    success: { main: '#3E7D5A' },
    background: { default: colors.cream, paper: colors.paper },
    text: { primary: colors.ink, secondary: '#5C514A' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Outfit", system-ui, sans-serif',
    h1: { fontFamily: '"Lilita One", "Outfit", sans-serif', fontWeight: 400 },
    h2: { fontFamily: '"Lilita One", "Outfit", sans-serif', fontWeight: 400 },
    h3: { fontFamily: '"Lilita One", "Outfit", sans-serif', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 28,
          paddingBlock: 12,
          fontSize: '1rem',
          transition: 'transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease',
          '&:active': { transform: 'translateY(1px) scale(0.98)' },
        },
        sizeSmall: { paddingInline: 16, paddingBlock: 6, fontSize: '0.875rem' },
        containedSecondary: {
          '&:hover': { backgroundColor: '#000' },
        },
        outlined: { borderWidth: 2, '&:hover': { borderWidth: 2 } },
      },
    },
    MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#fff', borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, borderRadius: 10 } },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 12, fontWeight: 500 } },
    },
  },
})

export default theme
