import './ProductCard.css';
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({id,name,price,img, onAdd, onRemove}) =>{
    const handleAddToCart = () => {
    if (onAdd) {
      onAdd(id);
    }
  };

    const handleRemoveFromCart = () => {
  if (onRemove) onRemove(id);
};



    return(
        <div className="product-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p className="price">{price}</p>
      <Button variant="contained" 
        startIcon={<ShoppingCartIcon />} 
        onClick={handleAddToCart} 
        sx={{ 
          backgroundColor: 'black', 
          borderRadius: '20px',
          '&:hover': { backgroundColor: '#b46868' } 
        }}
      >
        ADD TO CART
      </Button>
       <Button 
    variant="contained"
    startIcon={<RemoveIcon />} 
    onClick={handleRemoveFromCart}
    sx={{ 
      backgroundColor: 'black', 
          borderRadius: '20px',
          '&:hover': { backgroundColor: '#b46868' }
    }}
  >
    REMOVE
  </Button>

    </div>
    )
} 

export default ProductCard;