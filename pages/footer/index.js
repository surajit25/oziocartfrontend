import { Button, Container, Paper, TextField, Typography,Grid } from "@mui/material"
import React from "react"
import EmailIcon from '@mui/icons-material/Email';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


function Footer(){


    return(<React.Fragment>
    
        <Paper style={{borderRadius:'0px',backgroundColor:"black",color:'white',overflow:"hidden"}} >
       
           <Container sx={{p:2}} >

               <Grid container spacing={1}>
                   <Grid item lg={6} xl={6} md={12} xs={12} sm={12} >

                   <AlternateEmailIcon /> Copyright 2021 oziocart.com. All Rights Reserved

                   </Grid>

                   <Grid item lg={6} xl={6} md={12} xs={12} sm={12} >

                   <img src="/rupay.svg" className="col-12" />

                   </Grid>

               </Grid>

            

           </Container>

            
        </Paper>
    
    </React.Fragment>
    )
}

export default Footer