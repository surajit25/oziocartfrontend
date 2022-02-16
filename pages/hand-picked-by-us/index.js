import { Button, CardMedia, Container, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import server from "../api/apilink"
import Api from "../api/axioapi"


import { Carousel } from 'react-responsive-carousel';

import { Grid,Card } from "@mui/material"

export default function HandPicked(){

    const [Product,setProduct] = useState([])

    useEffect(()=>{

        Api.get(`${server}/handpicked`).then(res=>{

            setProduct(res.data)
            console.log(res.data)
        })
        

    },[])

    return(
        <>

        <Container>

        
         <Box>
        <Carousel  infiniteLoop showThumbs={false} showIndicators showArrows >
           
            {Product.map(item=>{
                return(
                    <>
                   
                    <Grid container spacing={2}>

                        <Grid item lg={6} xl={6} md={12} sm={12} xs={12} >

                                <CardMedia

                                component={'img'}

                                image={"https://oziocartimage.s3.amazonaws.com/media/"+item.image} 

                                />


                        </Grid>

                        <Grid item lg={6} xl={6} md={12} sm={12} xs={12} >

                            <Box sx={{p:2,display:{lg:"block",md:"none",sm:"none",xs:"none",xl:'block'}}}>

                            <Typography sx={{mb:1,fontWeight:'600'}}>handpicked by you</Typography>

                                <Typography sx={{width:{lg:'80%',xl:'80%',sm:'100%',md:'100%',xs:'100%'}}} >
                                        {item.content}
                                </Typography>

                                <Box sx={{mt:1,mb:1}} >
                                    <Button variant="contained" sx={{bgcolor:'black',color:'white'}} >View Product</Button>
                                </Box>

                            </Box>

                     

                        </Grid>

                    </Grid>

                
            </>
                )
            })}


        </Carousel> 

        </Box>

        </Container>

      

        </>
    )
}