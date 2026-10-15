import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'      
import Alert from '@mui/material/Alert'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [cartcount,setcartcount] = useState(0);
  const [open,setopen] = useState(false);
  const [openRemove,setopenRemove] = useState(false);

  const addToCart = (id) => {

    if(id==3){
      setcartcount(cartcount+2);
    }
    else{
      setcartcount(cartcount+1)
    }
    setopen(true);
  }

  const removeFromCart = (id) =>{

    if (cartcount >0)
    {   
    if(id==3){
      setcartcount(cartcount-2);
    }
    else{
      setcartcount(cartcount-1)
    }
    setopenRemove(true);
  }
  }

  const handleClose = () => setopen(false);

  const handleRemoveClose = () => setopenRemove(false);

  return (
    <>
      <BrowserRouter>
        <Navbar  count={cartcount} />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' variant='filled'>
            ittem ADDED hurray!!!!!!!!
          </Alert>
        </Snackbar>
        <Snackbar open={openRemove} autoHideDuration={2000} onClose={handleRemoveClose}>
          <Alert onClose={handleClose} severity='warning' variant='filled'>
            ittem Removed BBBBBAAAAAAADDDDDD!!!!!!!!
          </Alert>
        </Snackbar>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} onRemove={removeFromCart}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
