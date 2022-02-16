import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Stack,Paper} from "@mui/material";

import { Avatar } from "@mui/material";

import { green } from "@mui/material/colors";

import PersonPinIcon from '@mui/icons-material/PersonPin';

import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

import StarIcon from '@mui/icons-material/Star';

export default function ProductReview(){


    const v=[1,2,4,6,7]

   const [Review,setReview] = useState([])

   useEffect(()=>{
       setReview(v)
   },[])



    return(

        <>

      

            <Typography sx={{mt:2,mb:2,textAlign:'center',fontWeight:'600'}}>Product Review</Typography>

 

                <Grid container spacing={2} >

                    <Grid item sm={12} md={12} lg={12} xl={12} xs={12} >

                        <Stack spacing={1} direction='column' >
                           
                           <Paper sx={{p:1,fontWeight:'600'}} >

                               <Stack spacing={1} direction={'row'}>

                               <Box>
                                    2 <StarIcon sx={{fontSize:'15px',color:'green'}} />
                                </Box>

                               <Box sx={{backgroundColor:'green',p:1,width:'70%'}} >

                                </Box>

                                <Box>
                                    90%
                                </Box>

                               </Stack>


                         

                           </Paper>

                           <Paper sx={{p:1,fontWeight:'600'}} >

                            <Stack spacing={1} direction={'row'} >

                              <Box>
                                    4 <StarIcon sx={{fontSize:'15px',color:'blue'}} />
                                </Box>

                            <Box sx={{bgcolor:'blue',p:1,width:'40%'}} >

                            </Box>

                            <Box>
                                40%
                            </Box>

                            </Stack>

                       

                           </Paper>
                           <Paper sx={{p:1,fontWeight:'600'}} >

                               <Stack spacing={1} direction={'row'} >

                               <Box>
                                    3 <StarIcon sx={{fontSize:'15px',color:'yellow'}} />
                                </Box>


                               <Box sx={{bgcolor:'yellow',p:1,width:'30%'}} >

                                </Box>

                                <Box>
                                    30%
                                </Box>

                               </Stack>

                         

                           </Paper>
                           <Paper sx={{p:1,fontWeight:'600'}} >

                               <Stack spacing={1} direction={'row'} >
                               <Box>
                                    2 <StarIcon sx={{fontSize:'15px',color:'#00FFFF'}} />
                                </Box>

                               <Box sx={{bgcolor:'#00FFFF',p:1,width:'20%'}} >

                                </Box>

                                <Box>
                                    20%
                                </Box>

                               </Stack>

                         

                           </Paper>
                           <Paper sx={{p:1,fontWeight:'600'}} >

                               <Stack spacing={1} direction={'row'} >
                                
                                <Box>
                                    1 <StarIcon sx={{fontSize:'15px',color:'red'}} />
                                </Box>

                               <Box sx={{bgcolor:'red',p:1,width:'10%'}} >

                               </Box>

                               <Box>
                                   10%
                               </Box>

                               </Stack>

                          

                           </Paper>

                        </Stack>

                    </Grid>

                    <Grid item  sm={12} md={12} lg={12} xl={12} xs={12} >

                        {Review.map(item=>{
                            return(

                                <Paper key={item} sx={{p:2,mb:1}} >

                                <Box sx={{display:'flex',alignItems:'center'}}  >
    
                                    <Typography sx={{mx:1}} >
                                    <Avatar sx={{backgroundColor:green[500]}} ><PersonPinIcon /> </Avatar>
                                    </Typography>
                                    <Typography sx={{mx:1,fontWeight:'600'}} >Tapas</Typography>
                                    
                                </Box>
    
                                <Stack spacing={1} direction="row" >
    
                                 <Rating 
    
                                 defaultValue={4}
                                 
    
                                 />
    
                                 <Typography sx={{fontWeight:'700'}} >Superb Product</Typography>
    
    
    
                                </Stack>
    
                                <Box>
                                    <Typography>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia.
                                    </Typography>
                                </Box>
                                 
                            </Paper>
                                
                            )
                        })}

             
                    </Grid>

                </Grid>


           
   

        </>
    )
}