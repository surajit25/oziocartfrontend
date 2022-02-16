import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

import MenuIcon from '@mui/icons-material/Menu';
import MobileHeader from './mobheader';

import { styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

import Fade from '@mui/material/Fade';
import ContactUs from '../contactus';

import CloseIcon from '@mui/icons-material/Close';

import Router from 'next/router'
import { Button, Grid, Paper,Stack } from '@mui/material';
import Login from '../login';
import Register from '../register';
import Cookies from 'js-cookie';

import Badge from '@mui/material/Badge';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';



import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import server from '../api/apilink';
import Api from '../api/axioapi';
import DealOfDay from '../deal-of-the-day';
import Mobilesearchbar from './mobilesearch';

import CustomInput from '../inputfield';

import DesktopSearch from './desktopsearch'

import { ClickAwayListener } from '@mui/material';
import { AccountBox } from '@mui/icons-material';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal2 = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(32, 38, 45, 0.2);
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  bgcolor: 'background.paper',
  p: 2,
  px: 4,
  pb: 3,
};

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};




function Header(props){

    const [open,setOpen] = React.useState(false)

    const OpenMenubarMob=()=>{

        setOpen(!open)
    }

    const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);

  const [open2,setOpen2] = React.useState(false)

  const handleopen2 = ()=>{setOpen2(true)}
  const handleclose2 = ()=>{setOpen2(false)}

  const VisitHome=()=>{
        Router.push("/")
  }

  const VisitPage=(id)=>{

     Router.push(`/${id}`)
  }

  const VisitLoginpage=()=>{
    Router.push("/login")
  }

  const [register,setregister] =React.useState(false)

  const toggleRegister=()=>{
    setregister(!register)
  }



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open3 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl(null);
  };


  const Logout=()=>{

    Cookies.remove("user")
    
    window.location.reload()

  }

  const Visitcartpage=()=>{

    Router.push("/cart-item")
  }


  const VisitWishlist=()=>{

    Router.push("/wishlist-item")
  }

  const cart= useSelector(state=>state.cart)
  const [cartlength,setCartlength] =React.useState(0)
  const [wishlength,setWishlength] =React.useState(0)
  const dispatch =useDispatch()

  const wishlist = useSelector(state=>state.wishlist)

  React.useEffect(()=>{

   

    Api.post(`${server}/getallcartproduct`,{email:Cookies.get("user")}).then(res=>{

      var count = 0

      for(var i=0;i<res.data.length;i++){
        count+=Number(res.data[i].quantity)
      }

      setCartlength(count)
      dispatch({
        type:'Cart',
        payload:false
      })

    }).catch(er=>{
      setCartlength(0)
      dispatch({
        type:'Cart',
        payload:false
      })

    })

    
    Api.post(`${server}/getallwhislist`,{email:Cookies.get("user")}).then(res=>{

      var count = res.data.length

      setWishlength(count)
      dispatch({
        type:'Wishlist',
        payload:false
      })


    }).catch(er=>{

      
      setWishlength(0)
      dispatch({
        type:'Wishlist',
        payload:false
      })

    })

   
    

  },[cart,wishlist])


  const [open5,setOpen5] = React.useState(false)


  const handleclose5=()=>{
    
    setOpen5(true)
  }

  const handleClickListenaway=()=>{
    setOpen5(false)
  }

  const [mobilesearbaropen,setMobileSearchbar] = React.useState(false)

  const OpenMobSearchBar=()=>{

    setMobileSearchbar(!mobilesearbaropen)
  }



    return(
        
      <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{bgcolor:"#F8F9FA",color:'black'}} >
          <Toolbar>

              <Typography sx={{display:{lg:'none',md:"block",xl:"none",sm:"block",xs:'block'}}}>

                    <MenuIcon onClick={OpenMenubarMob}   />

              </Typography>

             {open==true? <MobileHeader open={open} click={OpenMenubarMob} />:""}

          <Container>

            <Box sx={{display:{lg:'block',md:"none",xl:"block",sm:"none",xs:'none'}}}>
              <Grid container spacing={2}>

                <Grid item lg={6} xl={6}>

                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                  {/* <img onClick={VisitHome} src='/logo.png' />
             */}

        <Typography onClick={VisitHome}  sx={{fontWeight:"600",fontSize:"30px"}}>DYCOZ</Typography>

               </Box>

              

                </Grid>

                <Grid item lg={6} xl={6}>

                  <Box sx={{display:'flex',justifyContent:"center",alignItems:'center',mt:1}}>
                    
             
            
                  {/* <Stack onClick={handleclose5} direction={'row'} sx={{cursor:'pointer',marginTop:'5px'}}  spacing={1}>
                    <Typography sx={{fontWeight:'600'}}>Search</Typography>
                    <Typography><SearchIcon /></Typography>

                  </Stack>

                  <Box>
                    {open5?
                    <DesktopSearch click={()=>handleclose5()} />:""
                    }
                  </Box> */}


              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickListenaway}
              >
                <Box sx={{ position: 'relative' }}>
                

                  <Stack direction={'row'} className='cursor' sx={{fontWeight:"600"}} onClick={handleclose5} >

                    <SearchIcon />
                    Search 

                    </Stack>

                  {open5? 
                    <DesktopSearch click={handleClickListenaway} />
                  : null}

                </Box>
              </ClickAwayListener>

                

                <Typography className='producttext' sx={{fontWeight:"600",mx:1,textTransform:"capitalize"}} onClick={()=>VisitPage("allproduct")} >Product</Typography>
                <Typography className='producttext' sx={{fontWeight:"600",mx:1,textTransform:"capitalize"}} onClick={()=>VisitPage("blog")} >Blog</Typography>
                <Typography className='producttext' sx={{fontWeight:"600",mx:1,textTransform:"capitalize"}} onClick={()=>VisitPage("about-us")} >Overview</Typography>
                {/* <Typography onClick={handleOpen} className='mx-2 fw-bold producttext'>Contact us</Typography> */}

                {Cookies.get("user")?
                <>
                <Stack direction={'row'} spacing={2}>

                    <Typography >

            <Badge badgeContent={cartlength}  color='primary' >
              <LocalMallIcon onClick={Visitcartpage} />

            </Badge>

            </Typography>
            
              <Typography   >

              <Badge badgeContent={wishlength}  color='primary' >
                <FavoriteBorderIcon onClick={VisitWishlist} />
              </Badge>

              </Typography>

              <Typography >

              <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick2}
              >
              <MoreVertIcon sx={{color:"black"}} />
              </Button>
              <Menu
              id="fade-menu"
              MenuListProps={{
              'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open3}
              onClose={handleClose3}
              TransitionComponent={Fade}
              >
              <MenuItem onClick={handleClose}>Profile</MenuItem>

              <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>


              </Typography>
                        
                </Stack>

              
                </>
                :
                <Box

                onClick={handleopen2}
                sx={{display:"flex",justifyContent:'center',alignItems:"center",mx:1}}
                >
                  
                  <InsertEmoticonIcon /> 

                  <Typography sx={{mx:1,fontWeight:"600"}}>

                  Login
                  </Typography>
               
  
                </Box>
                
                }

         

                </Box>

                </Grid>

              </Grid>



            </Box>



            <Box sx={{display:{lg:'none',md:"block",xl:"none",sm:"block",xs:'block'},p:1}} >

              <Grid container spacing={2}>

                <Grid item md={8} sm={8} xs={8}>
                  
                <Box onClick={VisitHome} >
                {/* <img src='/logo.png' /> */}

                <Typography sx={{fontWeight:"900",fontSize:"30px"}}>DYCOZ</Typography>
                </Box>

                </Grid>

                <Grid item md={4} sm={4} xs={4}>

                  <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center',mt:1}}>

                {Cookies.get("user")?
                <Box sx={{width:"100%"}} >
                  <Stack direction={'row'} spacing={2}>

                  <Typography sx={{mx:1}} >

                <Badge badgeContent={cartlength} color='primary' >
                  <LocalMallIcon onClick={Visitcartpage} />

                </Badge>

                </Typography>
                <Typography sx={{mx:2}}  >

                <Badge badgeContent={wishlength} color='primary' >
                  <FavoriteBorderIcon onClick={VisitWishlist} />
                </Badge>

                </Typography>

                  </Stack>
             

                </Box>
                :
                <Box

              onClick={VisitLoginpage}
              sx={{display:"flex",justifyContent:'center',alignItems:"center"}}
              >
                
                <InsertEmoticonIcon /> 
                
                <Typography sx={{mx:1,fontWeight:"600"}}>
                Login

                </Typography>
              </Box>
                
                
                }

                </Box>

                </Grid>

              </Grid>

            


            </Box>

          </Container>

     

            
          </Toolbar>


          <Box sx={{display:{lg:"none",md:"block",sm:'block',xs:"block",xl:"none"},p:1}}>

        
                 <CustomInput onClick={OpenMobSearchBar} placeholder="I'm Looking for..." />
                 
               
          </Box>

           
           <Box sx={{width:"100%"}}> 

           {mobilesearbaropen?<Mobilesearchbar click={OpenMobSearchBar} />:""}
             

           </Box>

           


               
      



        </AppBar>

      </HideOnScroll>



      <StyledModal

        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open1}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Fade in={open1}>

        <Box  className='col-6'>

             <Box sx={{position:'absolute',top:'10%',right:'10%'}} ><CloseIcon onClick={handleClose} style={{cursor:'pointer'}} /> </Box>

            <ContactUs />

        </Box>

        </Fade>
      
      </StyledModal>



      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open2}
        onClose={handleclose2}
        BackdropComponent={Backdrop}
      >
        <Fade in={open2}>

        <Box  className='col-6'>

           
             <Box sx={{position:'absolute',top:'10%',right:'10%'}} ><CloseIcon onClick={handleclose2} style={{cursor:'pointer'}} /> </Box>

          

            {register?<Register click={toggleRegister} />:<Login click={toggleRegister} />}

        </Box>

        </Fade>
      
      </StyledModal>

       

       


      </React.Fragment>
      
 
    )
}

export default Header