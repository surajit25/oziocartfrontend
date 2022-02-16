

  import { CardMedia, Container, Paper, Typography ,Card,Box,Stack} from "@mui/material";
  import Router  from "next/router";
  import React, { useEffect, useState } from "react";
  
  import Carousel from 'react-multi-carousel';
import server from "../api/apilink";
import Api from "../api/axioapi";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

  
  const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
    };
  
  
  export default function RelatedProducts(props){
      var img1="/clutches.jpeg"
      var img2 = "/men.png"
      var img3 = "/Light.jpeg"
      var x =[{id:1,image:img1},{id:2,image:img2},{id:3,image:img3},{id:4,image:img2}]
  
      const [product,setProduct] = useState(x)
      const [loading,setLoading] = useState(true)

      useEffect(()=>{

       
        Api.post(`${server}/relatedproduct`,{category:props.category}).then(res=>{

          setProduct(res.data)

          setLoading(false)
          
        }).catch(er=>{

          setProduct([])

          setLoading(false)
        })

      },[])
  
      const VisitPage=(item)=>{
  
        Router.push({pathname:`/product/${item.slug}/`,query:{color:item.color,size:item.size}})

      }
  
      return(
          <React.Fragment>
              
          
  
                  <Typography  sx={{fontWeight:'600',textAlign:'center',mt:1,mb:2}} >Related Products</Typography>

                  {loading?
               <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:'10vh',fontWeight:"600"}}>
                Loading ...

                 </Box>
             
              :

              <Carousel
              infinite 
              responsive={responsive}
              
            removeArrowOnDeviceType={['mobile']}

              >
 
                {product.map(item=>{
                    return(
                     <Card key={item} onClick={()=>VisitPage(item)} sx={{mx:1,mb:1,bgcolor:"#f1f8e9"}} >
                          
                     <CardMedia

                     component={'img'}

                     image = {"https://oziocartimage.s3.amazonaws.com/media/"+item.proim1}

                     sx={{width:'100%'}}

                     />

                   

                                    
                  <Stack sx={{p:2}} direction={'column'}>

                                                                                                                    

                  <Box component="div" sx={{ textOverflow: 'ellipsis',whiteSpace:"nowrap",overflow:"hidden",fontWeight:"600",textTransform:"capitalize" }}>
                  {item.name}
                  </Box>


                  <Stack direction={'row'} spacing={1}>

                    <Box sx={{display:"flex",alignItems:"center"}}> 


                      <CurrencyRupeeIcon   sx={{fontSize:"18px"}} /> 


                      <Typography sx={{fontSize:"25px",display:'flex',fontWeight:"600"}} >


                    {item.sellingprice}

                      </Typography>

                      </Box>





                    <Box sx={{display:"flex",alignItems:"center"}} >
                    
                      <CurrencyRupeeIcon  sx={{fontSize:"18px"}}  /> 

                  
                      <Typography sx={{fontSize:"20px",display:'flex',mx:1,fontWeight:"300"}} >
                              
                  <s>{item.MRP}</s> 

                      </Typography>

                    </Box>

                    </Stack>

                    <Typography sx={{fontSize:"18px",fontWeight:"500",color:"red"}}>
                      - {Math.round((item.MRP-item.sellingprice)*100/item.MRP)}% off
                    </Typography>



                  <Typography>
                    
                  </Typography>

                  </Stack>
                 
                   
                     
                 </Card>
                    )
                })}
             
 
             </Carousel>
 
               

              }
  
             
           
          </React.Fragment>
      )
  }
  
  





