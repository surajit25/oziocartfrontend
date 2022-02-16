import { Container, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import server from "../api/apilink"
import Api from "../api/axioapi"

import Image from "next/image"

import LinearProgress from '@mui/material/LinearProgress';

import Router from 'next/router'

import Box from '@mui/system/Box'

import { Grid,CardMedia } from "@mui/material"

function Secondbanner(props){
   
    const [Product,setProduct]  =useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        
        Api.post(`${server}/categorywiseproduct`,{category:props.category}).then(res=>{
                
           
            setProduct(res.data[0])

            setLoading(false)

            
        })

    },[])

    const VisitPage=(product)=>{
       
        Router.push({pathname:`/product-category/${props.category.replaceAll(" ","-").toLowerCase()}/${product.url}`})
    }

    return(
        <>
        <Container>
            {loading?
            <Box sx={{width:'100%',display:"flex",justifyContent:'center',alignItems:'center',p:2}} >

                <LinearProgress sx={{width:'40%',mt:2}} color="inherit" />

            </Box>
            
            :
            <Box onClick={VisitPage} >
               
               <Grid container spacing={1}>

                   <Grid item lg={6} md={12} sm={12} xs={12} xl={6} >

                       <Box>

                       {/* <Image height={620} width={930} src={Product.image1} blurDataURL="chair.jpg"   /> */}

                       <CardMedia

                       component={'img'}

                       image={"https://oziocartimage.s3.amazonaws.com/media/"+Product.image1}

                       />

                       </Box>

                   </Grid>

                   <Grid item lg={6} md={12} sm={12} xs={12} xl={6} >


                   <CardMedia

                    component={'img'}

                    image={"https://oziocartimage.s3.amazonaws.com/media/"+Product.image4}

                    />



                   </Grid>

               </Grid>

            </Box>
         
         }

        </Container>
        </>
    )
}

export default Secondbanner