
import { Box,Card,CardMedia,Grid } from "@mui/material"

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageContainer from "../imagecontainer";




export default function ProductDetials(props){

    const [ProductCommon ,setProductCommon]= React.useState([])

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  

    React.useEffect(()=>{


      setProductCommon(props.product)

    },[props])


    return(
        <>

     <Accordion expanded={expanded=='panel1'} onChange={handleChange("panel1")} sx={{mb:1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
              
              Product Description

          </Typography>
        </AccordionSummary>
        <AccordionDetails>


        <Typography  sx={{mb:1}} >
              <div  dangerouslySetInnerHTML={{__html:ProductCommon.description}} />
             
           </Typography>

       
        </AccordionDetails>
      </Accordion>




      <Accordion expanded={expanded=='panel2'} onChange={handleChange("panel2")}  sx={{mb:1}}> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
              
            Detail Image

          </Typography>
        </AccordionSummary>
        <AccordionDetails>


        <Box sx={{width:'100%',mb:1}} >
              
              <Card  sx={{p:1}}  >
                
          

                <ImageContainer

                height={"auto"}

                width={"100%"}

                src={"https://oziocartimage.s3.amazonaws.com/media/"+ProductCommon.image1}
                

                />

            
         </Card>
          </Box>

       
        </AccordionDetails>
      </Accordion>





      
      <Accordion expanded={expanded=='panel3'} onChange={handleChange("panel3")}  sx={{mb:1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
              
            Materials and fabrics

          </Typography>
        </AccordionSummary>
        <AccordionDetails>


        <div dangerouslySetInnerHTML={{__html:ProductCommon.materials}} />
                  

       
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded=='panel4'} onChange={handleChange("panel4")}  sx={{mb:1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
              
           More Detail

          </Typography>
        </AccordionSummary>
        <AccordionDetails>

  
        
            <Box sx={{width:"100%"}}>

            <Grid sx={{width:'100%'}} container spacing={1} >

                <Grid item sm={12} md={12} lg={6} xl={6} xs={12} >

                    <Card  sx={{p:1}}  >
                

                        <ImageContainer

                        height={"auto"}

                        width={"100%"}

                        src={"https://oziocartimage.s3.amazonaws.com/media/"+ProductCommon.image2}


                        />
                    
                    </Card>




                </Grid>

                <Grid item sm={12} md={12} lg={6} xl={6} xs={12} >

                <Card sx={{p:1}} >
                        
                <ImageContainer

                height={"auto"}

                width={"100%"}

                src={"https://oziocartimage.s3.amazonaws.com/media/"+ProductCommon.image3}


                />
                    
                    </Card>

            </Grid>

            </Grid>

            </Box>
       
        </AccordionDetails>
      </Accordion>

           

    


        </>
    )
}