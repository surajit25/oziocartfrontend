import { Container, Paper, Typography,Box,Stack,CardMedia,Grid} from "@mui/material";
import React, { useState } from "react";

import Carousel from 'react-multi-carousel';

import Image from "next/image";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


export default function PartnarBrand(){
    var img1="#009688"
    var img2 = "#006064"
    var img3 = "#00bfa5"
    var img4 = '#66bb6a'
 

    var x =[{id:1,image:img1,name:'Upto 50% off'},{id:2,image:img2,name:"Upto 80% off"},{id:3,image:img3,name:'Under Rs. 4999'},{id:3,image:img4,name:'Under Rs.999'}]

    const [Logo,setLogo] = useState(x)

    return(
        <React.Fragment>

            <Container sx={{mb:2}}>

            <Typography  sx={{fontWeight:'600',textAlign:'center',mt:1,mb:1}} >Best Deals and Offer</Typography>

        

            <Carousel
             infinite 
             responsive={responsive}
             
             removeArrowOnDeviceType={['mobile']}

             >
  
          {Logo.map(item=>{
              return(
                  <Paper key={item} onClick={()=>VisitPage(item)} sx={{display:'flex',height:{lg:"200px",md:"200px",xs:"200px",xl:"200px"},p:3,backgroundColor:`${item.image}`,justifyContent:'center',flexDirection:'column',alignItems:"center",mx:1}} >
                    
                             
                      <Typography sx={{fontSize:"30px"}}>
                            {item.name}
                      </Typography>
                      
                  </Paper>
              )
          })}


      </Carousel>

  
            </Container>

         
        </React.Fragment>
    )
}

