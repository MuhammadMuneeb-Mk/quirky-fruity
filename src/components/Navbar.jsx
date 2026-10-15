import { useState } from 'react';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';

const Navbar = ({count}) => {

    const [isOpen,setIsOpen] = useState(false);

    const closemenu =  () => setIsOpen(false)

    const scrollToSection = (sectionId) => {
        closemenu();                    // Close mobile menu first
        const element = document.getElementById(sectionId);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <nav className='navbar'>
            <div className='Logo'>
                <h1>Quirk-Fruity</h1>
            </div>
            
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                 <li onClick={() => scrollToSection('home')}>Home</li>
                 <li onClick={() => scrollToSection('menu')}>Menu</li>
                 <li onClick={() => scrollToSection('product')}>Product</li>
                 <li onClick={() => scrollToSection('about')}>About</li>
                 <li>
  <IconButton color="inherit">
    <Badge 
      badgeContent={count} 
      color="error"
      sx={{
        '& .MuiBadge-badge': {
          fontSize: '0.8rem',
          minWidth: '20px',
          height: '20px'
        }
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: 30 }} />
    </Badge>
  </IconButton>
</li>
                </ul>

                <div className='hamburger' onClick={() => setIsOpen(!isOpen)}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>

        </nav>
    )
}

export default Navbar