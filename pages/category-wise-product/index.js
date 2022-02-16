import React from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Container, Paper, Typography ,Grid,Stack} from "@mui/material";
import Secondbanner from "../SecondBanner";

export default function CategoryWise(){


    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    return(
        <React.Fragment>

            <Container sx={{mt:4}}>

                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',mt:2}} >

                    <Grid container spacing={1} >

                        <Grid item lg={3} md={12} sm={12} xs={12} xl={3}  sx={{display:{lg:'block',md:'none',sm:'none',xl:'block',xs:'none'}}} >

                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',p:3}}>

                            <Stack direction={'column'} >

                                
                                <Typography className="fw-bold mx-2 fs-3">
                                    Spotlight
                                </Typography>


                                <Typography className="mt-1 mb-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur.
                                </Typography>

                            </Stack>


                    </Box>


                        </Grid>

                        <Grid item lg={9} md={12} sm={12} xs={12} xl={9}>

                        <Box sx={{width:'100%'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                        
                            aria-label="secondary tabs example"
                            variant="fullWidth"
                            scrollButtons={false}
                            TabIndicatorProps={{sx: {
                                backgroundColor: 'black',
                            },}}
                            textColor="inherit"
                            
                            
                        >
                            <Tab   sx={{color:'black'}} value="one" label="Men Wear" />
                            <Tab   sx={{color:'black'}} value="two" label="Women Wear" />
                           

                        </Tabs>

                        <Box sx={{width:'100%',p:1,mt:2}} >

                            {value=='one'?<Secondbanner category='Men Wear' />:''}
                            {value=='two'?<Secondbanner category='Women Wear' />:''}
                       
                            
                        </Box>


                        </Box>
               

                        </Grid>

                    </Grid>

           

               </Box>
                


            </Container>



          


        </React.Fragment>
    )
}