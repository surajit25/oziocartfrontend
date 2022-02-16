import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import CustomInput from '../inputfield';

import { Typography,List,ListItem,ListItemText, Stack } from '@mui/material';
import Backbuttonwith from './backbuttonwithheader';

import Api from '../api/axioapi';

import server from '../api/apilink';

import { useState,useEffect } from 'react';

import Router from 'next/router';

import CallMadeIcon from '@mui/icons-material/CallMade';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;



export default function Mobilesearchbar(props) {

  const [open,setOpen] = useState(true)

  const handlopen = ()=>setOpen(true)

  const handleClose=()=>setOpen(false)

  

  const topsearch=['bra','Panty','men underwear','men shorts']

  const [SearchResult,setSearchResult]= useState([])

  const [Topsearch,setTopsearch] = useState([])

  const [searchvalue,setSearchvalue] = useState("")

  const [showsearch,setSearchshow] = useState(false)

  useEffect(()=>{

   
      setTopsearch(topsearch)

  },[])


  const SearchResultfunction=(value)=>{

      setSearchvalue(value)

       if(value){
          Api.get(`${server}/searchresult/?search=${value}`).then(res=>{


            let temp =[]

            for(var i=0;i<res.data.length;i++){
                temp.push(res.data[i])
            }

            setSearchResult(temp)


              setSearchshow(true)

          }).catch(er=>{

              setTopsearch(topsearch)

              setSearchshow(false)

          })
       }else{
        
           setTopsearch(topsearch)

           setSearchshow(false)
       }
      
  }

  const VisitProductpage=(item)=>{


      Router.push({pathname:`/product/${item.slug}`,query:{size:item.size,color:item.color}})

      CloseSearch()

  }

  const CloseSearch=()=>{

    props.click()
    
  }

  return (
    <Box sx={{height:"100vh"}}> 
    
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >

           

        <Box sx={{height:"100vh",width:"100%",backgroundColor:"white",overflow:"scroll",}}>

           
          <Box sx={{mb:1,position:"sticky",top:"0px",zIndex:"100"}}>
            
                <Backbuttonwith close={CloseSearch} />

            </Box>

          

            <Box sx={{p:1 ,position:"sticky",top:"80px",zIndex:"100"}}>

                 <CustomInput value={searchvalue} onChange={()=>SearchResultfunction(event.target.value)} placeholder="Search ..." />


           </Box>




        


            
            <Box sx={{mt:2,mb:1,p:2}}>

          <Typography sx={{fontWeight:"600"}} >

              {showsearch?'Search results':"Top Searches"}
              
          </Typography>

          <Box>
            {showsearch?

            <Box sx={{mt:1}}>

            {SearchResult.map((item,index)=>{

                return(
                    
                        <Stack key={index} sx={{p:2,border:'1px solid black',mb:1,borderRadius:"4px",display:'flex'}}  onClick={()=>VisitProductpage(item)} direction={'row'} spacing={2}>

                              <Box sx={{display:"flex",flexGrow:1}}>

                              <Typography >
                                        <img height={30} src={item.proim1} />
                                    </Typography>

                                <Typography sx={{fontWeight:"600",fontSize:'15px',mx:1,}}>{item.name} {item.color} </Typography>


                              </Box>
                              
                                <Typography><CallMadeIcon /></Typography>

                         </Stack>
                          
                )
            })}

            </Box>
            
            :
              <Box sx={{mt:1}}>

              {Topsearch.map((item,index)=>{

                  return(
                     
                    <Stack key={index} sx={{p:2,border:'1px solid black',mb:1,borderRadius:"4px",display:'flex'}} onClick={()=>SearchResultfunction(item)} direction={'row'} spacing={2}>
                              
                       <Typography sx={{fontWeight:"600",textTransform:"capitalize",fontSize:'15px',flexGrow:1}}>
                         {item}
                        </Typography>

                        <Typography >
                           <CallMadeIcon />
                        </Typography>

                     </Stack>
                         
                  )
              })}

            </Box>

    
            }
          </Box>

          </Box>

         
        
        </Box>
      </StyledModal>
    </Box>
  );
}
