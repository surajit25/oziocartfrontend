import { Button, Paper, TextField, Typography,Stack } from "@mui/material"
import React from "react"
import EmailIcon from '@mui/icons-material/Email';
import Api from "../api/axioapi";

import {useState} from 'react'

import { Snackbar } from "@mui/material";
import server from '../api/apilink'

import { Box, } from "@mui/system";


import CustomInput from "../inputfield";



function Subscribe(){

    const [email,setEmail] = useState("")

    const [emailerror,setEmailerror]=useState("")
    

    const ChangeInput=(e)=>{
        setEmail(e)
    }


    const [subsnack,setsubsnack] = useState(false)

    const  vertical='top'
    const horizontal='center'
    const [message,setMessage]  = useState('')
   
   
    



    const Subscribeus=()=>{


         if(email==""){

            setEmailerror("Email not be null")

         }else if(email.includes("@")==false || email.includes(".")==false){
             setEmailerror("Email is not valid")
         }else{

            Api.post(`${server}/subscribeus`,{email:email}).then(res=>{

                setsubsnack(true)
                setMessage("Thanks for subscribing with us.")

            }).catch(er=>{
                setsubsnack(true)
                setMessage("Thanks for attempt, You are already subscribed.")

            })
         }


        
    }

    
const handleClose=()=>{

    setsubsnack(!subsnack)

    setEmailerror("")
    setEmail("")
  }
  


    return(<React.Fragment>
    
        <Box sx={{bgcolor:"#F8F9FA",display:{lg:"none",xl:'none',md:"block",sm:'block',xs:"block",p:3}}}>
          
          <Box sx={{textAlign:"center",p:2}} >
              <Typography  sx={{fontWeight:'600'}} className=" jointext">Please Subscribe us for regular update.</Typography>
           


          </Box>

           <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >

               <Stack  direction={'column'} >

               {/* <Box sx={{display:'flex',justifyContent:"center",alignItems:'center'}} >
                                    <EmailIcon sx={{mt:2}} />
                                    <TextField

                                    variant='standard'

                                    label="Email"

                                    />

                        
                                </Box> */}

                                <CustomInput placeholder="Enter Your Email" />

                                            
                                <Box sx={{mb:2,mt:1}}>
                                <Button  sx={{bgcolor:'black',color:'white'}} >Submit</Button>
                               </Box>

               </Stack>

          

           </Box>
           
            
        </Box>

        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={subsnack}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
        
        />

    
    </React.Fragment>
    )
}

export default Subscribe