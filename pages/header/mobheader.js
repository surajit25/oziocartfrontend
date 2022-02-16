

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

import Inventory2Icon from '@mui/icons-material/Inventory2';

import BookIcon from '@mui/icons-material/Book';

import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Stack, Typography } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import Router from 'next/router';
import Cookies from 'js-cookie';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import DescriptionIcon from '@mui/icons-material/Description';

export default function MobileHeader(props) {
  const [state, setState] = React.useState(props.open)

 
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    props.click()

    setState(open);
  };

  const VisitPage=(id)=>{
       Router.push(id)
       props.click()
  }

  const Logout=()=>{

    Cookies.remove("user")
    
    window.location.reload()
    
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}

      className=''
    >
      <List>

          <Typography className='p-2'    >

            <CancelIcon onClick={toggleDrawer("left", false)} sx={{fontSize:'30px'}} />

          </Typography>
        
          <ListItem button  sx={{p:1}} >
            <ListItemIcon>

                <Inventory2Icon />
              
            </ListItemIcon>
            <ListItemText onClick={()=>VisitPage("allproduct")} primary={"Product"} />

            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>


          <ListItem button sx={{p:1}} >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText onClick={()=>VisitPage("blog")} primary={"Blog"} />
            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>

      
          <ListItem button sx={{p:1}}  >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText onClick={()=>VisitPage("contact-us")}  primary={"Contact Us"} />

            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>

      
          <ListItem button sx={{p:1}}  >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText onClick={()=>VisitPage("about-us")}  primary={"OverView"} />

            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>

      

          {Cookies.get("user")?
          <>
          <ListItem button sx={{p:1}}  >
            <ListItemIcon>
              <InsertEmoticonIcon />
            </ListItemIcon>
            <ListItemText onClick={()=>VisitPage("profile")}  primary={"My account"} />

            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>

         
          <ListItem button sx={{p:1}}  >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText onClick={Logout}  primary={"Log out"} />

            <ListItemIcon>

            <ArrowRightIcon />

            </ListItemIcon>

          </ListItem>

          </>:""}


        
      </List>


      
      <Typography sx={{position:"fixed",mb:1,bottom:'2px',p:1}} >

        <Stack direction={'column'} spacing={1}>
        <small>24x7 customer support </small>
          <small>support@oziocart.com</small>

        </Stack>

         

      </Typography>

      
    </Box>
  );

  return (
    <div>
     
        <React.Fragment >
       
          <SwipeableDrawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}

          </SwipeableDrawer>
        </React.Fragment>
      
    </div>
  );
}
