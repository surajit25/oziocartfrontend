import { Button, Container, TextField,Paper } from "@mui/material"
import { useState } from "react"

import axios from 'axios'
import server from "../api/apilink"

import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';


function ContactUs(){

    const [Contact,setContact] = useState({
        name:"",
        phone:"",
        email:"",
        interest:"",
        message:""
    })

    const Inputchange =(event)=>{
        
        setContact({
            ...Contact,
            [event.target.name]:event.target.value
        })
    }

    const [contacterror,setConacterror] = useState({
        nameerror:"",
        phoneeror:"",
        emialerror:"",
    })

    const [loader,setLoader] = useState(false)


    const [message, setMessage] = useState("")

    const SubmitContact=()=>{

        setLoader(true)

        if(Contact.name==""){
            setConacterror({
                nameerror:"Name not be null"
            })
            setLoader(false)

        }else if(Contact.phone==""){
            setConacterror({
                nameerror:"",
                phoneeror:"Phone not be null"
            })
            setLoader(false)
        }else if(Contact.phone.length!=10){
            setConacterror({
                nameerror:"",
                phoneeror:"Phone number should be 10 digit"
            })
            setLoader(false)
        }else if(Contact.email==""){
               setConacterror({
                   emialerror:"Email not be null",
                   nameerror:"",
                   phoneeror:""
               })
               setLoader(false)
        }else if(Contact.email.includes("@")==false || Contact.email.includes(".")==false){
            setConacterror({
                emialerror:"Email is not valid",
                nameerror:"",
                phoneeror:""
            })
            setLoader(false)
        }else{

            
            axios.post(`${server}/contact`,{
                name:Contact.name,
                phone:Contact.phone,
                email:Contact.email,
                interest:Contact.interest,
                message:Contact.message
            }).then(res=>{

                setMessage(<span className="text-succes">Thanks for Submiting your query we will connect with you very soon.</span>)

                 ResetForm()

                setLoader(false)



            }).catch(er=>{
                
                setMessage(<span className="text-danger">Something wrong!</span>)


                setLoader(false)

            })


        }


    }

    const ResetForm=()=>{

        setContact({
            name:"",
            email:"",
            phone:"",
            interest:"",
            message:""
        })

        setConacterror({
            nameerror:"",
            emialerror:"",
            phoneeror:"",
        })

        handleopen()
    }


    const  vertical='top'
    const horizontal='center'


    const [open, setOpen] = React.useState(false);
    
 
      const handleopen = () => {
          setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return(
        <div className="d-flex justify-content-center align-items-center col-12">
        <Paper className="p-3 col-11">

              
               
            <Container>

                <p className="fw-bold text-uppercase text-center mb-2 ">Contact us</p>
              
                <div className="col-12 d-flex justify-content-center align-items-center flex-column">

                <TextField
                label='Enter Name'
                variant='outlined'
                className='col-lg-7 col-11 mb-2'
                error={contacterror.nameerror!=""?true:false}
                helperText={contacterror.nameerror!=""?contacterror.nameerror:""}

                
                name="name"
                value={Contact.name}
                onChange={()=>Inputchange(event)}
          

                />

                <TextField
                
                label='Enter phone'
                variant='outlined'
                className='col-lg-7 col-11 mb-2'

                type="number"

                error={contacterror.phoneeror!=""?true:false}
                helperText={contacterror.phoneeror!=""?contacterror.phoneeror:""}

                name="phone"
                value={Contact.phone}
                onChange={()=>Inputchange(event)}
          


                />

                <TextField

                label='Enter Email'
                variant='outlined'
                className='col-lg-7 col-11 mb-2'

                error={contacterror.emialerror!=""?true:false}
                helperText={contacterror.emialerror!=""?contacterror.emialerror:""}

                name="email"
                value={Contact.email}
                onChange={()=>Inputchange(event)}
          


                />

                <TextField

                label='Enter Interest'
                variant='outlined'
                className='col-lg-7 col-11 mb-2'
                   
                name="interest"
                value={Contact.interest}
                onChange={()=>Inputchange(event)}
          

                />

                <TextField

                label='Message'
                variant='outlined'
                
                className='col-lg-7 col-11 mb-2'
                
                name="message"
                value={Contact.message}
                onChange={()=>Inputchange(event)}
          

                />

                <div className="col-lg-7 col-11 text-start">

                <Button

                variant="contained"
                className="bg-dark text-white"

                onClick={SubmitContact}
           
                >
                    {loader?<div className="spinner-border spinner-border-sm" role="status">
                    
                    </div>:"Submit"}
                </Button>

                </div>

                 </div>

                
              


            </Container>
       
                
            
        </Paper>

        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={4000}
        />

        </div>
    )
}

export default ContactUs