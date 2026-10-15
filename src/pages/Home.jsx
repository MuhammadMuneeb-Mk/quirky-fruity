import './Home.css'
import ProductCard from '../components/ProductCard'
import fruit_left_hero from '../assets/left-fruit-hero.svg'
import fruit_right_hero from '../assets/right-fruit-hero.svg'
import hero_img_splatter from '../assets/hero-img-splatter.svg'
import deliciously_splatter_see_menu from '../assets/Deliciously-Splatter.png'
import deliciously_splatter_see_menu_fruit from '../assets/Deliciously-Splatter-Fruit.png'
import pineapple_fav_sect from '../assets/pineapple-fav-section.png'
import beat_summer_fruit from '../assets/beat-summer-right-fruit.png'
import try_some_fruit from '../assets/try-some-new-fruit.png'
import feel_fresh_right_edge from '../assets/splatter-right-edge.png'
import feel_fresh_left_edge from '../assets/splatter-left-edge.png'
import feel_fresh_bottom_fruit from '../assets/fresh-fruit-img-bottom.png'
import circle_bg from '../assets/circle-background.png';
import Button from '@mui/material/Button';
import { TextField, Box, } from '@mui/material';
import { useState } from 'react';
import { colors } from '@mui/material'


const Home = ({onAdd,onRemove}) => {

    const products = [
    { id: 1, name: "Orange Juice", price: "$3.20", img: "../src/assets/orange-juice-product.png" },
    { id: 2, name: "Pineapple Juice", price: "$3.20", img: "../src/assets/pineapple-juice-product.png" },
    { id: 3, name: "Papaya Juice", price: "$3.20", img: "../src/assets/papaya-juice-product.png" },
  ];

    return(
        <div className="page">
        
        <section className="hero" id='home'>
        <div className="hero-container">
            <div className="left-hero">
                <div className="left-hero-img">
                    <img src={hero_img_splatter} className='img-splatter-hero' />
                    <img src={fruit_left_hero} className='fruit-left-hero' />
                </div>
                <div className='left-hero-txt'>
                    <h2>open from <br /><span className='left-hero-highlight'>8</span>am - <span className='left-hero-highlight'>10</span>am</h2>
                </div>
            </div>
            <div className='center-hero'>
            <h1>
                Treat yourself <br />with something <br /><span>Fresh</span> & <span>Tasty</span>!
            </h1>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: '30px',
                backgroundColor: '#FF5722',
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#e64a19',
                    boxShadow: 'none'
                }
              }}
            >
                Learn More
            </Button>
            </div>
            <div className='right-hero'>
            <div className="right-hero-img">
                    <img src={hero_img_splatter} className='img-splatter-hero-right' />
                    <img src={fruit_right_hero} className='fruit-right-hero' />
                </div>
                <div className='right-hero-txt'>
                <h3>treat yourself <br /> with something <br />fresh and tasty!</h3>
                </div>
            </div>

        </div>            
        </section>
        
        <section className='see-menu-sect'>
            <div className='see-menu-container'>
            <div className='see-menu-left'>
                <p className='see-menu-text'><span style={{fontWeight:'bolder'}}>Lorem ipsum dolor sit amet</span> consectetur adipi scing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus pendisse ultrices gravida. Risus commodo viver ra maecenas.
                   accumsan lacus vel facilisis. 
                </p>
                <Button               variant="`contained`"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: '30px',
                width: '75%',
                backgroundColor: '#0e0e0e',
                fontWeight: 'bolder',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#000000',
                    boxShadow: 'none'
                }
              }}>SEE MENU</Button>
            </div>

            <div className='see-menu-right'>
                <img src={deliciously_splatter_see_menu} className='delicious-spatter-see-menu'/>
                <img src={deliciously_splatter_see_menu_fruit} className='delicious-spatter-fruit-see-menu'/>
            </div>
            </div>
        </section>


    <section className='bubble-background' style={{
        backgroundImage: `url(${circle_bg})`,
        backgroundsize: '110%',
        backgroundPosition: 'center'
    }}
    >
        <section class="menu-section" id='menu'>

        <h1 class="menu-title">All time Favorites</h1>

        <div class="menu-container">

             {/* <!-- LEFT IMAGE --> */}
            <div class="menu-left">
              <img src={pineapple_fav_sect} alt="fruit" />
            </div>

            {/* <!-- RIGHT CONTENT --> */}
             <div class="menu-right">

                {/* <!-- SMOOTHIES --> */}
                    <div class="menu-card">
                        <div class="menu-pill">SMOOTHIES</div>

                            <div class="menu-row">
                             <span>Papaya Smoothie</span>
                             <span class="dots"></span>
                            <span>$2.30</span>
                            </div>

                        <div class="menu-row">
                            <span>Apple Smoothie</span>
                            <span class="dots"></span>
                            <span>$2.30</span>
                            </div>

                        <div class="menu-row">
                            <span>Pineapple Smoothie</span>
                            <span class="dots"></span>
                            <span>$2.30</span>
                        </div>

                    </div>

                {/* <!-- JUICES --> */}
                    <div class="menu-card">
                        <div class="menu-pill">FRESH JUICE</div>

                            <div class="menu-row">
                                <span>Banana Fresh Juice</span>
                                <span class="dots"></span>
                                <span>$2.30</span>
                            </div>

                        <div class="menu-row">
                            <span>Cherry Fresh Juice</span>
                            <span class="dots"></span>
                            <span class="dots"></span>
                            <span>$2.30</span>
                        </div>

                        <div class="menu-row">
                            <span>Kiwi Fresh Juice</span>
                            <span class="dots"></span>
                            <span>$2.30</span>
                        </div>

                    </div>

            </div>
        </div>
        </section>

        <section className='beat-summer'>
            <div className='beat-summer-container'>
                <div className='beat-summer-left'>
                    <h1>Beat summer <br />Heat with <br /><span style={{color: "#FF5722"}}>Quiky Fruity</span>!</h1>
                    <p className='see-menu-text'><span style={{fontWeight:'bolder'}}>Lorem ipsum dolor sit amet</span> consectetur adipi scing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus pendisse ultrices gravida. Risus commodo viver ra maecenas.
                        accumsan lacus vel facilisis. 
                    </p>
                    <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: '30px',
                backgroundColor: '#0e0e0e',
                width: '75%',
                fontWeight: 'bolder',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#000000',
                    boxShadow: 'none'
                }
              }}
            >
                SEE MORE
            </Button>
                    
                </div>
                <div className='beat-summer-right'>
                    <img src={beat_summer_fruit} alt="" />
                </div>

            </div>

        </section>
        </section>

        <section className='Product-card-sect' id='product'>
            {products.map(item => (
            <ProductCard 
              id={item.id}  
              name={item.name} 
              price={item.price} 
              img={item.img}
              onAdd={onAdd}
              onRemove = {onRemove} 
            />
          ))}
        </section>
        
        <section className='try-something-section'>

          <div className='try-something-container'>
                        <div className='try-some-left'>
            <img src={try_some_fruit} alt="" />
            </div>

            <div className='try-some-right'>
            <h1>Try something that feels <span style={{color:'#FF5722'}}>new</span> and <span style={{color:'#FF5722'}}>you</span>!</h1>
              <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: '30px',
                backgroundColor: '#0e0e0e',
                width: '75%',
                fontWeight: 'bolder',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#000000',
                    boxShadow: 'none'
                }
              }}
            >
                SEE MORE
            </Button>
            </div>


          </div>
          <div className='feel-fresh-container'>
            <img src={feel_fresh_right_edge} className='feel-fresh-right-edge-img'/>
            <h1>Feel refreshed and energize<br />with these <span style={{color:'#FF5722'}}>fresh fruit</span> drinks!</h1>
                          <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: '30px',
                backgroundColor: '#FF5722',
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#e64a19',
                    boxShadow: 'none'
                }
              }}
            >
                Learn More
            </Button>
            <img src={feel_fresh_left_edge} className='feel-fresh-left-edge-img'  />

            <div className='bottom-fruit-feel-fresh'>
              <img src={feel_fresh_bottom_fruit}  />
            </div>
          </div>

        </section>

<section className="newsletter" 
style={{
        backgroundImage: `url(${circle_bg})`,
        backgroundsize: '110%',
        backgroundPosition: 'center'
    }}>
  <h2 style={{ textAlign: 'center',fontFamily: 'Poppins, sans-serif', fontWeight: '800', color: 'black', fontSize: '45px' }}>
    Newsletter <span style={{ color: '#FF5722' }}>Registration</span>
  </h2>

  <Box
    sx={{
      mt: 4,
      mx: 'auto',
      width: '100%',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      p: 4,
      borderRadius: '20px',

    }}
  >

    {/* First + Last Name */}
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="First Name"
        fullWidth
        sx={{ backgroundColor: 'white', borderRadius: '10px' }}
      />

      <TextField
        label="Last Name"
        fullWidth
        sx={{ backgroundColor: 'white', borderRadius: '10px' }}
      />
    </Box>

    <TextField
      label="Email Subject"
      fullWidth
      sx={{ backgroundColor: 'white', borderRadius: '10px' }}
    />

    <TextField
      label="Message..."
      multiline
      rows={5}
      fullWidth
      sx={{ backgroundColor: 'white', borderRadius: '10px' }}
    />

    <Button
      variant="contained"
      sx={{
        mt: 2,
        alignSelf: 'center',
        px: 5,
        py: 1.5,
        borderRadius: '30px',
        backgroundColor: 'black',
        fontWeight: 'bold',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#333'
        }
      }}
    >
      SUBMIT EMAIL
    </Button>

  </Box>
</section>

<section className="footer" id='about'>
  <div className="footer-container">

    {/* LEFT SIDE - LOGO */}
    <div className="footer-left">
      <h1 className="footer-logo">quirky<br />-fruity</h1>
    </div>

    {/* CENTER - LINKS */}
    <div className="footer-links">

      <div className="footer-col">
        <p>Home</p>
        <p>About</p>
        <p>Menu</p>
      </div>

      <div className="footer-col">
        <p>Smoothies</p>
        <p>Juices</p>
        <p>Fruits</p>
      </div>

      <div className="footer-col">
        <p>Imports</p>
        <p>Branches</p>
        <p>Social Media</p>
      </div>

      <div className="footer-col">
        <p>History</p>
        <p>Job Vacancies</p>
      </div>

    </div>

    {/* RIGHT SIDE - IMAGE */}
    <div className="footer-right">
      <img src={fruit_right_hero} alt="fruit character" />
    </div>

  </div>
</section>


        </div>
    )
} 

export default Home