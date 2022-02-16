import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Backbuttonwith from '../header/backbuttonwithheader';


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blueGrey, grey } from "@mui/material/colors";


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Typography ,Stack} from '@mui/material';

export default function MobileSort(props) {


  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  React.useEffect(()=>{

  },[props])


  const [state, setState] = React.useState({
   
    bottom: true,
  
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if(open==false){
      
        props.click()
    }

    setState({ ...state, [anchor]: open });
  };

  const CloseFilter=()=>{

    props.click()
  }

const [sortedway,setSorteway] = React.useState("")

const LowtoHigh=()=>{
  
    setSorteway("lowtohigh")
    props.lowtohigh()

}

const HightoLow=()=>{
    setSorteway("hightolow")
    props.hightolow()
}


  const list = (anchor) => (
    <Box
      
      role="presentation"
   
      onKeyDown={toggleDrawer(anchor, false)}

      sx={{overflow:"scroll"}}
    >
         <Box sx={{position:"sticky",top:"0px",zIndex:"100"}}>


         <Backbuttonwith  close={CloseFilter} />

         </Box>


         <Box sx={{p:1}}>

            
         <Accordion  sx={{mb:1}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Price
                    </Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>

                        <Stack direction={'column'} spacing={1} >

                       



                        <FormGroup>
                          <FormControlLabel onClick={LowtoHigh} control={<Checkbox defaultChecked={sortedway=='lowtohigh'?true:false}  />} label={"Low to High"} />

                          
                          <FormControlLabel onClick={HightoLow} control={<Checkbox defaultChecked={sortedway=='hightolow'?true:false}  />} label={"High to Low"} />

                          

                          </FormGroup>

              

                        </Stack>

                 
                    </AccordionDetails>
                  </Accordion>

         </Box>
     



    </Box>
  );

  return (
    <div>
   
        <React.Fragment >

           
          <SwipeableDrawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}

            PaperProps={{
                sx:{width:"100%",height:"100vh",overflow:"scroll"},
                
            }}
         
          >
            


            {list('bottom')}



          </SwipeableDrawer>




        </React.Fragment>

    </div>
  );
}
