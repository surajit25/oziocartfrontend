import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Backbuttonwith from '../header/backbuttonwithheader';
import Categoryfilter from './category';
import ColorFilter from './color';
import SizeFilter from './size';

import { Slide } from '@mui/material';

export default function MobileFilter(props) {
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

  const ChangeCategory=(item)=>{

    props.handlecategory(item)
  }

  const Changesize=(item)=>{

    props.handlesize(item)
  }

  const ChangeColor=(item)=>{

    props.handlecolor(item)
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

             <Categoryfilter handlecategory={(item)=>ChangeCategory(item)} category={props.category} />


             <ColorFilter handlecolor={(item)=>ChangeColor(item)} color = {props.color} />

             <SizeFilter handlesize={(item)=>Changesize(item)} size={props.size} />



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
